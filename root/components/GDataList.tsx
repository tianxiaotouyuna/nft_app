import { windowHeight } from '@/utils/system';
import { assign, clone, merge } from 'lodash';
import React, { Component, ReactNode } from 'react'
import { StyleSheet, View, FlatList, FlatListProps, ListRenderItemInfo, ListRenderItem, StyleProp, ViewStyle, Alert } from 'react-native'
export enum WHERELIST {
    MARKET_LIST = 1, //市场列表
    ORDER_LIST = 2, //订单列表
    COLLECTION_CATEGORY_STYLE = 3, //合集列表列表
}
export interface GDataListProps {
    style?: StyleProp<ViewStyle>
    whereList?: WHERELIST
    requestParams?: { [key: string]: any }
    defaultPageSize?: number
    keyExtractor?: (item: any, index: number) => string;
    requestBeforeFun?: () => boolean
    // requestMethod: (params: object) => Promise<{ list: any[], isListEnd: boolean, total: number }>
    requestMethod: (params: object) => Promise<any>
    // requestMethod: (params: object) => Promise<{ data: any[], msg: string, code: number }>
    renderItem: ListRenderItem<any> | null | undefined
    getItemLayout?: (data: any, index: number,) => { length: number; offset: number; index: number };
    handleDataList?: (list: any[]) => Promise<any[]>;
    numColumns?: number
    columnWrapperStyle?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null
    ItemSeparatorComponent?: React.ComponentType<any> | null
    [key: string]: any
    onScroll?: () => void;
}

interface GDataListState {
    dataList: any[]
    pageNumber: number
    isListEnd: boolean
    isRefreshing: boolean
    isPageLoading: boolean
    total: number
    currentCursor: string
}

export default class dGDataList extends Component<GDataListProps, GDataListState> {
    private _adjustParams = {};

    static defaultProps: GDataListProps = {
        requestBeforeFun: () => true,
        defaultPageSize: 10,
        requestParams: {},
        requestMethod: ({ }) => Promise.resolve({ data: [], msg: '', code: 0, goods: [] }),
        renderItem: undefined,
        numColumns: undefined,
        keyExtractor: (item, index) => `${item?.id}_${index}`,
    }

    constructor(props: GDataListProps) {
        super(props);
        this.state = {
            dataList: [],
            pageNumber: 1,
            isListEnd: false,
            isRefreshing: false,
            isPageLoading: true,
            total: 0,
            currentCursor: ''
        }
    }

    $setState = (state: object) => {
        return new Promise<void>((resolve) => {
            this.setState(state, () => resolve());
        })
    }

    componentDidMount = async () => {
        await this._getList();
        await this.$setState({ isPageLoading: false })
    }

    componentWillUnmount = () => {

    }

    getDataList = () => this.state.dataList;
    setDataList = (dataList: any[]) => {
        this.$setState({ dataList });
    }
    getIsListEnd = () => this.state.isListEnd;
    setIsListEnd = (isListEnd: boolean) => this.$setState({ isListEnd });
    getTotal = () => this.state.total;
    getPageNumber = () => this.state.pageNumber;
    setPageNumber = (pageNumber: number) => this.$setState({ pageNumber });
    refreshData = () => this._onRefresh();

    private _getList = async () => {
        let { pageNumber, dataList, currentCursor } = this.state;
        let { defaultPageSize, requestMethod, requestParams, requestBeforeFun, handleDataList, whereList } = this.props;
        // if (this.state.isListEnd) return Promise.resolve(true);
        // if (this.state.isRefreshing) return Promise.resolve(true);
        if (!(requestBeforeFun?.() ?? true)) return Promise.resolve(true);
        await this.$setState({ isRefreshing: true });
        let data_handler;
        if (whereList == WHERELIST.ORDER_LIST) {
            const params = assign({}, requestParams, { pageNumber: pageNumber, pageSize: defaultPageSize });
            this._adjustParams = params;
            const { rows } = await requestMethod(params);
            data_handler = rows;
        }
        else if (whereList == WHERELIST.MARKET_LIST||WHERELIST.COLLECTION_CATEGORY_STYLE) {
            const params_ = assign({}, requestParams?.params, { cursor: currentCursor, limit: defaultPageSize });
            const params_data = { path: requestParams?.path, params: params_ }
            this._adjustParams = params_data;
            const { data, cursor } = await requestMethod(params_data);
            data_handler = data;
            currentCursor = cursor
        }
        const newList = !!handleDataList ? await handleDataList(data_handler) : data_handler;
        dataList = pageNumber === 1 ? newList : dataList.concat(newList);
        await this.$setState({ dataList, pageNumber: ++pageNumber, isRefreshing: false, currentCursor });
        return Promise.resolve(true);
    }

    private _onRefresh = async () => {
        await this.$setState({ pageNumber: 1, isListEnd: false, currentCursor: '' });
        await this._getList();
    }

    // 上拉加载

    private _onEndReached = async () => {
        const { isListEnd, isRefreshing } = this.state;
        if (isListEnd || isRefreshing) return
        await this._getList();

    }

    render = () => {
        const { dataList, isRefreshing, isPageLoading } = this.state;
        const { style, keyExtractor, columnWrapperStyle, onScroll, contentContainerStyle, numColumns, getItemLayout, renderItem, ListEmptyComponent, ListHeaderComponent, ListFooterComponent, ItemSeparatorComponent } = this.props;
        return (
            <View style={[styles.containerStyle, style]}>
                <FlatList
                    style={styles.scrollContainerStyle}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    contentContainerStyle={[
                        dataList?.length === 0 && !ListHeaderComponent && !ListFooterComponent && { flex: 1 }, contentContainerStyle
                    ]}
                    // 默认
                    keyExtractor={keyExtractor}
                    data={dataList}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
                    refreshing={isRefreshing}
                    onRefresh={this._onRefresh}
                    onEndReachedThreshold={0.01}
                    onEndReached={this._onEndReached}
                    onScroll={onScroll}
                    ListEmptyComponent={isPageLoading ? undefined : ListEmptyComponent}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={ListFooterComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    numColumns={numColumns}
                    columnWrapperStyle={columnWrapperStyle}


                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollContainerStyle: {
        flex: 1,
    },
})

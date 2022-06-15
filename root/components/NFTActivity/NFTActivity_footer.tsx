import { UIELEMENTS } from '@/constants/index';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { LoadingFooter } from 'react-native-spring-scrollview';
import styles from './nft-activit';

export class NFTActivity_footer extends LoadingFooter {


   _renderIcon=()=> {
      const s = this.state.status;
      console.log('===='+s)
      if (s === "loading" || s === "cancelLoading" || s === "rebound") {
        return <ActivityIndicator animating={true} color={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} />
      }
      const { maxHeight, offset, bottomOffset } = this.props;
    
       if (s === "allLoaded") {
        return "已加载完全部";
      }
      return (
        <ActivityIndicator animating={true} color={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} />
      );
    }
    _renderContent=()=>{
      return null;
    }
  
     _getTitle=()=>{
      const s = this.state.status;
      if (s === "dragging" || s === "waiting") {
        return "Drag up to load";
      } else if (s === "draggingEnough") {
        return "Release to load";
      } else if (s === "loading") {
        return "Loading ...";
      } else if (s === "draggingCancel") {
        return "Give up loading";
      } else if (s === "rebound") {
        return "Load completed";
      } else if (s === "allLoaded") {
        return "已加载完全部";
      }
    }
    render() {
      if (this.state.status === "allLoaded")
      return (
        <View style={styles.container}>
          {/* <Text style={styles.text}>{this._getTitle()}</Text> */}
        </View>
      );

    return (
      <View style={styles.container}>
        {this._renderIcon()}
      </View>
    );
    }
    
}

import React, { FunctionComponent, LegacyRef, ReactNode, Ref, useState } from "react";
import { Text, View } from "react-native";
import styles from "./range";
import { pxToDp } from "@/utils/system";
import NtfButton from "@/components/NtfButton/NtfButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type AssetBtnWrapsProps = {
  onPress_1?: () => void;
  onPress_2?: () => void;
  ref?: Ref<any>;
  bottom?: number;
  isFromMyDetail?: boolean
};
const Bottom: FunctionComponent<AssetBtnWrapsProps> = (props) => {
  const { onPress_1, onPress_2, bottom = useSafeAreaInsets().bottom, ref, isFromMyDetail = false } = props;
  const renderBtn = () => (
    
    isFromMyDetail ?
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <NtfButton
          text="取消出售"
          width={pxToDp(220)}
          heigh={pxToDp(84)}
          borderRadius={pxToDp(12)}
          textColor="#383838"
          borderColor="#979797"
          onPress={onPress_1}
        >
          {" "}
        </NtfButton>
        <NtfButton
          text="降低价格"
          width={pxToDp(220)}
          heigh={pxToDp(84)}
          textColor="white"
          borderRadius={pxToDp(12)}
          backgroundColor="#3352DB"
          style={{ marginLeft: pxToDp(24) }}
          borderColor="#3352DB"
          onPress={onPress_2}
        >
          {" "}
        </NtfButton>
      </View>
      :
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <NtfButton
          text="出售"
          width={pxToDp(220)}
          heigh={pxToDp(84)}
          borderRadius={pxToDp(12)}
          textColor="#383838"
          borderColor="#979797"
          onPress={onPress_1}
        >
          {" "}
        </NtfButton>
        <NtfButton
          text="购买"
          width={pxToDp(220)}
          heigh={pxToDp(84)}
          textColor="white"
          borderRadius={pxToDp(12)}
          backgroundColor="#3352DB"
          style={{ marginLeft: pxToDp(24) }}
          borderColor="#3352DB"
          onPress={onPress_2}
        >
          {" "}
        </NtfButton>
      </View>
  )
  return (
    <View style={styles.container} ref={ref}>
      <View
        style={{
          backgroundColor: "#F0F0F0",
          height: pxToDp(2),
          width: "100%",
        }}
      />
      <View style={styles.sub_container}>
        <View style={{}}>
          <Text style={{ color: "#707A83", fontSize: pxToDp(24) }}>
            最低价格
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#383838" }}>123</Text>
          </View>
        </View>
        {renderBtn()}

      </View>
      <View
        style={{ width: "100%", height: bottom }}
      ></View>
    </View>
  );
};

export default Bottom;

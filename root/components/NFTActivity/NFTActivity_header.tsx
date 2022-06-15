import { UIELEMENTS } from '@/constants/index';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, Text } from 'react-native-paper';
import { LoadingFooter, RefreshHeader } from 'react-native-spring-scrollview';
import styles from './nft-activit';

export class NFTActivity_header extends RefreshHeader {


   _renderIcon=()=> {
    const s = this.state.status;
      return <ActivityIndicator animating={true} color={UIELEMENTS.DEFAULT_HEADER_COLOR_ACTIVE} />
    }
    _renderContent=()=>{
      return null;
    }
  
     _getTitle() {
        const s = this.state.status;
        if (s === "pulling" || s === "waiting") {
          return "Pull down to refresh";
        } else if (s === "pullingEnough") {
          return "Release to refresh";
        } else if (s === "refreshing") {
          return "Refreshing ...";
        } else if (s === "pullingCancel") {
          return "Give up refreshing";
        } else if (s === "rebound") {
          return "Refresh completed";
        }
      }
    render() {
    return (
      <View style={styles.container}>
        {this._renderIcon()}
      </View>
    );
    }
    
}

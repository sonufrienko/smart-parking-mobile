import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function ParkingDetailsSection({ title, subtitle, price, priceDescription, buttomLeftText, buttomLeftTitle, buttomRightText, buttomRightTitle }) {
  return (
    <React.Fragment>
      <View style={styles.infoHead}>
        <View style={styles.infoHeadLeft}>
          <Text style={styles.infoHeadTitle}>{title}</Text>
          <Text style={styles.grayColor}>{subtitle}</Text>
        </View>

        <View style={styles.infoHeadRight}>
          <Text style={styles.infoHeadPrice}>{price}</Text>
          <Text style={styles.grayColor}>{priceDescription}</Text>
        </View>
      </View>

      <View style={styles.infoBottom}>
        <View style={styles.infoBottomLeft}>
          <Text style={styles.infoBottomHint}>{buttomLeftTitle}</Text>
          <Text style={styles.boldText}>{buttomLeftText}</Text>
        </View>

        <View style={styles.infoBottomSeparator}></View>

        <View style={styles.infoBottomRight}>
          <Text style={styles.infoBottomHint}>{buttomRightTitle}</Text>
          <Text style={styles.boldText}>{buttomRightText}</Text>
        </View>
      </View>
    </React.Fragment>
)};
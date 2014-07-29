/*
 * Copyright (C) 2010 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.zxing.client.android;

import java.util.Arrays;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.regex.Pattern;

import android.content.Intent;
import android.net.Uri;
import com.google.zxing.BarcodeFormat2;

final class DecodeFormatManager {

  private static final Pattern COMMA_PATTERN = Pattern.compile(",");

  static final Collection<BarcodeFormat2> PRODUCT_FORMATS;
  static final Collection<BarcodeFormat2> ONE_D_FORMATS;
  static final Collection<BarcodeFormat2> QR_CODE_FORMATS = EnumSet.of(BarcodeFormat2.QR_CODE);
  static final Collection<BarcodeFormat2> DATA_MATRIX_FORMATS = EnumSet.of(BarcodeFormat2.DATA_MATRIX);
  static {
    PRODUCT_FORMATS = EnumSet.of(BarcodeFormat2.UPC_A,
                                 BarcodeFormat2.UPC_E,
                                 BarcodeFormat2.EAN_13,
                                 BarcodeFormat2.EAN_8,
                                 BarcodeFormat2.RSS_14);
    ONE_D_FORMATS = EnumSet.of(BarcodeFormat2.CODE_39,
                               BarcodeFormat2.CODE_93,
                               BarcodeFormat2.CODE_128,
                               BarcodeFormat2.ITF,
                               BarcodeFormat2.CODABAR);
    ONE_D_FORMATS.addAll(PRODUCT_FORMATS);
  }

  private DecodeFormatManager() {}

  static Collection<BarcodeFormat2> parseDecodeFormats(Intent intent) {
    List<String> scanFormats = null;
    String scanFormatsString = intent.getStringExtra(Intents.Scan.FORMATS);
    if (scanFormatsString != null) {
      scanFormats = Arrays.asList(COMMA_PATTERN.split(scanFormatsString));
    }
    return parseDecodeFormats(scanFormats, intent.getStringExtra(Intents.Scan.MODE));
  }

  static Collection<BarcodeFormat2> parseDecodeFormats(Uri inputUri) {
    List<String> formats = inputUri.getQueryParameters(Intents.Scan.FORMATS);
    if (formats != null && formats.size() == 1 && formats.get(0) != null){
      formats = Arrays.asList(COMMA_PATTERN.split(formats.get(0)));
    }
    return parseDecodeFormats(formats, inputUri.getQueryParameter(Intents.Scan.MODE));
  }

  private static Collection<BarcodeFormat2> parseDecodeFormats(Iterable<String> scanFormats,
                                                              String decodeMode) {
    if (scanFormats != null) {
      Collection<BarcodeFormat2> formats = EnumSet.noneOf(BarcodeFormat2.class);
      try {
        for (String format : scanFormats) {
          formats.add(BarcodeFormat2.valueOf(format));
        }
        return formats;
      } catch (IllegalArgumentException iae) {
        // ignore it then
      }
    }
    if (decodeMode != null) {
      if (Intents.Scan.PRODUCT_MODE.equals(decodeMode)) {
        return PRODUCT_FORMATS;
      }
      if (Intents.Scan.QR_CODE_MODE.equals(decodeMode)) {
        return QR_CODE_FORMATS;
      }
      if (Intents.Scan.DATA_MATRIX_MODE.equals(decodeMode)) {
        return DATA_MATRIX_FORMATS;
      }
      if (Intents.Scan.ONE_D_MODE.equals(decodeMode)) {
        return ONE_D_FORMATS;
      }
    }
    return null;
  }

}

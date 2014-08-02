
$('#txtViewSupplierInfo').click(function () {
                                var ajaxcallobj = {
                                url: "getreportsinfo",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                          
                                          if (response.length > 0) {
                                          
                                          var url = response[0].employeeAnalysis;
                                          navigator.app.loadUrl(url);                                          }
                                          
                                          });
                                
                 
                  });

$('#txtViewIndustryInfo').click(function () {
                                var ajaxcallobj = {
                                url: "getreportsinfo",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                          
                                          if (response.length > 0) {
                                          
                                          var url = response[0].employeeAnalysis;
                                          navigator.app.loadUrl(url);                                          }
                                          
                                          });
                                
                              
                                
                                });

$('#txtStoreComparationInfo').click(function () {
                                    var ajaxcallobj = {
                                    url: "getreportsinfo",
                                    data: {
                                    store_id: objlocalStorage.Store_ID
                                    }
                                    }
                                    WMT.jqXHR(ajaxcallobj, function (response) {
                                              
                                              if (response.length > 0) {
                                              
                                              var url = response[0].employeeAnalysis;
                                              navigator.app.loadUrl(url);                                              }
                                              
                                              });
                                
                             
                                
                                });

$('#txtViewLocationInfo').click(function () {
                                var ajaxcallobj = {
                                url: "getreportsinfo",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                          
                                          if (response.length > 0) {
                                          
                                          var url = response[0].employeeAnalysis;
                                          navigator.app.loadUrl(url);                                          }
                                          
                                          });
                                
                              
                                
                                });

$('#txtViewHRInfo').click(function () {
                          var ajaxcallobj = {
                          url: "getreportsinfo",
                          data: {
                          store_id: objlocalStorage.Store_ID
                          }
                          }
                          WMT.jqXHR(ajaxcallobj, function (response) {
                                    
                                    if (response.length > 0) {
                                    
                                    var url = response[0].employeeAnalysis;
                                    navigator.app.loadUrl(url);                                    }
                                    
                                    });
                          
                                
                                });

$('#txtJoinVIP').click(function () {
                       var ajaxcallobj = {
                       url: "getreportsinfo",
                       data: {
                       store_id: objlocalStorage.Store_ID
                       }
                       }
                       WMT.jqXHR(ajaxcallobj, function (response) {
                                 
                                 if (response.length > 0) {
                                 
                                 var url = response[0].employeeAnalysis;
                                 navigator.app.loadUrl(url);                                 }
                                 
                                 });
                          
                       
                          
                          });
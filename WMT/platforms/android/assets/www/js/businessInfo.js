
$('#txtViewSupplierInfo').click(function () {
                                var ajaxcallobj = {
                                    url: "businessreport",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                    debugger;
                                          if (response.length > 0) {
                                          
                                              var url = response[0].reportURL;
                                        navigator.app.loadUrl(url);
                                          }
                                          
                                          });
                                
                 
                  });

$('#txtViewIndustryInfo').click(function () {
                                var ajaxcallobj = {
                                    url: "businessreport",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                          
                                          if (response.length > 0) {
                                          
                                              var url = response[1].reportURL;
                                        navigator.app.loadUrl(url);
                                          }
                                          
                                          });
                                
                              
                                
                                });

$('#txtStoreComparationInfo').click(function () {
                                    var ajaxcallobj = {
                                        url: "businessreport",
                                    data: {
                                    store_id: objlocalStorage.Store_ID
                                    }
                                    }
                                    WMT.jqXHR(ajaxcallobj, function (response) {
                                              
                                              if (response.length > 0) {
                                              
                                                  var url = response[2].reportURL;
                                            navigator.app.loadUrl(url);
                                              }
                                              
                                              });
                                
                             
                                
                                });

$('#txtViewLocationInfo').click(function () {
                                var ajaxcallobj = {
                                    url: "businessreport",
                                data: {
                                store_id: objlocalStorage.Store_ID
                                }
                                }
                                WMT.jqXHR(ajaxcallobj, function (response) {
                                          
                                          if (response.length > 0) {
                                          
                                              var url = response[3].reportURL;
                                        navigator.app.loadUrl(url);
                                          }
                                          
                                          });
                                
                              
                                
                                });

$('#txtViewHRInfo').click(function () {
                          var ajaxcallobj = {
                              url: "businessreport",
                          data: {
                          store_id: objlocalStorage.Store_ID
                          }
                          }
                          WMT.jqXHR(ajaxcallobj, function (response) {
                                    
                                    if (response.length > 0) {
                                    
                                        var url = response[4].reportURL;
                                  navigator.app.loadUrl(url);
                                    }
                                    
                                    });
                          
                                
                                });

$('#txtJoinVIP').click(function () {
                       var ajaxcallobj = {
                           url: "businessreport",
                       data: {
                       store_id: objlocalStorage.Store_ID
                       }
                       }
                       WMT.jqXHR(ajaxcallobj, function (response) {
                                 
                                 if (response.length > 0) {
                                 
                                     var url = response[5].reportURL;
                               navigator.app.loadUrl(url);
                                 }
                                 
                                 });
                          
                       
                          
                          });
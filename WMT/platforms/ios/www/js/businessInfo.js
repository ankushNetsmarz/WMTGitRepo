
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
                                          window.open(url,'_blank','location=no');
                                          }
                                          
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
                                          window.open(url,'_blank','location=no');
                                          }
                                          
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
                                              window.open(url,'_blank','location=no');
                                              }
                                              
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
                                          window.open(url,'_blank','location=no');
                                          }
                                          
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
                                    window.open(url,'_blank','location=no');
                                    }
                                    
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
                                 window.open(url,'_blank','location=no');
                                 }
                                 
                                 });
                          
                       
                          
                          });
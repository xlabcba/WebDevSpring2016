/**
 * Created by lixie on 16/4/5.
 */

(function(){
    angular
        .module("scrollToItem", [])
        .directive("scrollToItem", scrollToItem);

    function scrollToItem() {
        return {
            restrict: 'A',
            scope: {
                scrollTo: "@"
            },
            link: function(scope, $elm, angular, attr) {
                $elm.on('click', function() {
                    /*
                    $("#horizontalTab ul li.resp-tab-item.resp-tab-active").removeClass("resp-tab-active");
                    $("#horizontalTab ul li.resp-tab-item").eq(2).addClass("resp-tab-active");
                    console.log($("#horizontalTab div.resp-tabs-container div.resp-tab-content"));
                    $("#horizontalTab div.resp-tabs-container div.tab-1.resp-tab-content.resp-tab-content-active").removeClass("resp-tab-content-active");
                    $("#horizontalTab div.resp-tabs-container div.tab-1.resp-tab-content").eq(2).addClass("resp-tab-content-active");
                    console.log($("#horizontalTab div.resp-tabs-container div.resp-tab-content"));
                    */
                    var $respTabs = $("#horizontalTab");
                    var $currentTab = $respTabs.find("[role=tab]").eq(2);
                    var $tabAria = $currentTab.attr('aria-controls');

                    if ($currentTab.hasClass('resp-accordion') && $currentTab.hasClass('resp-tab-active')) {
                        $respTabs.find('.resp-tab-content-active').slideUp('', function () {$respTabs.find("[role=tab]").eq(2).addClass('resp-accordion-closed'); });
                        $currentTab.removeClass('resp-tab-active');
                        return false;
                    }
                    if (!$currentTab.hasClass('resp-tab-active') && $currentTab.hasClass('resp-accordion')) {
                        $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                        $respTabs.find('.resp-tab-content-active').slideUp().removeClass('resp-tab-content-active resp-accordion-closed');
                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');

                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').slideDown().addClass('resp-tab-content-active');
                    } else {
                        $respTabs.find('.resp-tab-active').removeClass('resp-tab-active');
                        $respTabs.find('.resp-tab-content-active').removeAttr('style').removeClass('resp-tab-content-active').removeClass('resp-accordion-closed');
                        $respTabs.find("[aria-controls=" + $tabAria + "]").addClass('resp-tab-active');
                        $respTabs.find('.resp-tab-content[aria-labelledby = ' + $tabAria + ']').addClass('resp-tab-content-active').attr('style', 'display:block');
                    }

                    $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
                });
            }
        };
    }
})();


$(document).ready(function() {
    if (mobilecheck()) {
        $('html').addClass('mobile');
    } else {
        var en = ['Home', 'Projects', 'Professions', 'Education',
                'Internship', 'Current Position', 'Contact Me'];
        var cn = ['首页', '项目', '技能', '教育', '实习', '供职', '联系'];
        var isCn = window.location.href.indexOf('cn.html') >= 0;
        $('.section').addClass('initing');
        $('#pagepiling').pagepiling({
            loopBottom: true,
            navigation: {
                'position': 'left',
                'tooltips': isCn ? cn : en
            },
            onLeave: function(index, nextIndex, direction) {
                var $pages = $('.section');
                for (var i = 0; i < $pages.length; ++i) {
                    if (i + 1 !== nextIndex) {
                        $($pages[i]).addClass('leaving');
                    } else {
                        $($pages[i]).removeClass('leaving');
                    }
                }
            }
        });
        $('.initing').removeClass('initing');
    }
});

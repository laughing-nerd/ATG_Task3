// $(function () {
$(document).ready(function () {
    var numDots = 7; // Number of dots
    var wHeight = $(window).height();
    var dotElements = []; // Array to store dot elements
    var dotElements2 = [];
    var tl = gsap.timeline({ paused: true });
    // Initialize dot elements
    for (var i = 1; i <= numDots; i++) {
        dotElements.push($("#Dots" + i + " path.dotsst"));
    }
    // Function to reset dot colors to their default state
    function resetDotColors() {
        dotElements.forEach(function (dotElement) {
            dotElement.css('fill', 'rgba(255, 255, 255, 0.3)');
        });
    }
    var currentIndex = 0; // Track the current section index
    $.scrollify({
        section: ".scrollify-section",
        easing: "easeOutExpo",
        scrollSpeed: 50,
        offset: 0,
        scrollbars: false,
        setHeights: false,
        before: function (index, sections) {
            // Calculate the total length of the path (opaque ring)
            var totalLength = $("#Opaque_Ring")[0].getTotalLength();
            // Calculate the dasharray value for each dot
            var dasharray = [];
            for (var i = 1; i <= numDots; i++) {
                var dotLength = totalLength * (i / (numDots - 1));
                dasharray.push(dotLength + " " + totalLength);
            }
            // Animate the Opaque Ring using GSAP
            tl.clear();

            if (index === 0) {
                // If in div 1, set the dasharray to make the ring invisible
                tl.to("#Opaque_Ring", { duration: 0.2, strokeDasharray: 0 });
                // Reset dot colors to default
                resetDotColors();
                $('#Dots1 path.dotsst').css("fill", "rgb(0, 146, 255)");
            } else {
                // Otherwise, animate to the current dot
                tl.to("#Opaque_Ring", { duration: 0.2, strokeDasharray: dasharray[index - 1] });
                for (var i = 0; i <= index; i++) {
                    dotElements[i].css('fill', 'rgb(0, 146, 255)');
                }
                // Reset the color of previously visited dots to default
                for (var i = index + 1; i < numDots; i++) {
                    dotElements[i].css('fill', 'rgba(255, 255, 255, 0.3)');
                }
            }
            currentIndex = index; // Update the current section index
            tl.play();
        }
    });



    $('.scrollify-section').scrollie({
        scrollOffset: -50,
        direction: "both",
        scrollingInView: function (elem) {
            let bgLeft = elem.data('left');
            let bgRight = elem.data('right');

            $('.left').css('background-color', bgLeft);
            $('.svgContainer').css('background-color', bgLeft);
            $('.right').css('background-color', bgRight);
        },
    });



    //For mobile
    let slider = tns({
        container: '.wrapper-mobile',
        items: 1,
        slideBy: 'page',
        controls: false,
        loop: false,
        mouseDrag: true,
        navPosition: "bottom"
    });

    slider.events.on('indexChanged', (info) => {
        resetNavStyles();
        updateNavDotStyle(info.index);
    });

    function resetNavStyles() {
        const navDots = document.querySelectorAll('.tns-nav button');
        navDots.forEach(dot => {
            $(dot).css("background", "rgba(255,255,255,0.5)");
        });
    }

    function updateNavDotStyle(currentIndex) {
        const navDots = document.querySelectorAll('.tns-nav button');
        if (currentIndex >= 0 && currentIndex < navDots.length) {
            $(navDots[currentIndex]).css("background", "#fff");
        }
    }
});
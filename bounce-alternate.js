/*-----------------------------------------------------------------*\
---------- #BOUNCE-ALTERNATE-FUNCTION ------------
\*------------------------------------------------------------------*/

/* *
  * This is an alternate, or deprecated, version of the bounce function, but I
  * wanted to keep it just in case it came in handy for another purpose.  That
  * new bounce function (bounce.js) uses much less code, and is much simpler to
  * implement since it makes use of the cssAnimate function instead of doing
  * it's own animation.  The main variable/parameter differences between the
  * animations, is that this one only needs a loop counter half the size (since
  * a single iteration does 1 "rise" and 1 "fall"), and this one does not need a
  * counterAdjust value (since the "falling" animation uses a separate counter).
  *
  * An initializing function should be used to call this function, so that all
  * of the neccessary paramters can be sent.  This allows the function to be
  * used for multiple bounces, using different values, if it is ever needed.
  *
  * This will create 1 full loop (1 "rise" and 1 "fall"), and be iterated over
  * until the loopCounter value (passed in from the initializing function)
  * reaches 0.  After a full loop is finished, the loopCounter decreases by 1
  * along with a decrease (amount specified by the initializing function as
  * counterEndDecrease) for the counterEnd (which dictates how high a bounce
  * will "rise").  After the loopCounter reaches 0, the interval is cleared and
  * the function is ready to be called again (if an infinite animation is
  * needed, for example).
  *
  * loopCounter tells the loop how many times it should run.  counterStart tells
  * the counter where to start counting from for each iteration.  counterEnd
  * tells the loop where counterStart should end (initiating the "falling"
  * animation).  counterEndDecrease tells the loop how much counterEnd should
  * decrease after 1 full iteration (basically, tell the next bounce how much
  * lower it should "rise" as comapred to the previous bounce).  counterValue
  * tells the loop how much counterStart should increase for each iteration (or
  * for "falling" animations, how much fallingCounterStart should decrease).
  * intervalSetting tells the loop how fast (or slow) the interval should run
  * at.  targetElement is the html element that will "bounced".  styleProperty
  * tells the loop what style property should be animated (height, width, top,
  * bottom, etc...).  styleUnit tells the loop what unit (px, %, etc...) should
  * be used with styleProperty.
  *
  * The initializing function (or the function that calls the initializing
  * function) can be used with a timeout to delay the bounce, or with an
  * interval so that it runs indefinitely.
*/

function bounce (loopCounter, counterStart, counterEnd, counterEndDecrease, counterValue, intervalSetting, targetElement, styleProperty, styleUnit) {

  'use strict';

  var fallingCounterStart, interval;

  // Initialize any variables that are needed, but were not passed as paramters
  fallingCounterStart = 0;  // This will be needed to both initiate the "falling" animation, and to actually do the "falling" animation

  // Being the main animation loop for the bounce
  interval = setInterval(function () {

    // The loopCounter (passed in from the initializing function) will be decremented by 1 after each full loop.  Once this value reaches 0, stop the animation by clearing the interval
    if (loopCounter === 0) {

      clearInterval(interval);  // Finally, clear the interval setting after all settings have been set

    // As long as the loopCounter is above 0, continue with the animation
  } else if (loopCounter > 0) {

      // Once counterStart equals the counterEnd value, the "falling" animation will need to begin
      if (counterStart >= counterEnd) {

        // Once fallingCounterStart equals 0, the "falling" animation will have ended.  So, decrease counterEnd (by the amount specified according to the initializing function), reset counterStart, and decrease the loopCounter
        if (fallingCounterStart <= 0) {

          counterEnd -= counterEndDecrease;  // The "falling" animation has ended, so decrease counterEnd by counterEndDecrease (passed in by the intializing function).  This will tell the next bounce to not "rise" as high as this bounce did
          counterStart = 0;  // Reset counterStart since a value of 0 will be needed for the next loop's start.  This cannot be reset before now because a check of counterStart === counterEnd is needed to tell the loop to do/continue the falling animation
          loopCounter -= 1;

        // fallingCounterStart has not yet reached 0, so continue with the "falling" animation
      } else if (fallingCounterStart > 0) {

          fallingCounterStart -= counterValue;  // Decrease fallingCounterStart by counterValue (passed in from the intializing function);  This value will need to be rest at the end of 1 full loop (after the "falling" animation ends)

          targetElement.style[styleProperty] = fallingCounterStart + styleUnit;  // Apply the new value to the targetElement

        }

      // counterStart has not yet reached counterEnd, so continue with the "rising" animation
    } else if (counterStart < counterEnd) {

        counterStart += counterValue;  // Increase counterStart by counterValue (passed in from the initializing function);  This value will need to be reset at the end of 1 full loop (after the "falling" animation ends);  Increase or decrease counterValue to control the speed of the animation (intervalSetting as well, but this generally gives better control)
        fallingCounterStart = counterStart;  // Make fallingCounterStart equal to counterStart, so that when counterStart equals counterEnd the "falling" animation will have the same value that counterStart did when it ended;  counterStart cannot be used for the "falling" animation because it needs to remain equal with counterEnd so that the conditional check for starting the "falling" animation will pass while the "falling" animation continues to run;  Both values will need to be reset at the end of 1 full loop (after the "falling" animation ends)


        targetElement.style[styleProperty] = counterStart + styleUnit;  // Apply the new value to the targetElement

      }

    }

  }, intervalSetting);  // intervalSetting was passed in from the initializing function;  Adjusting this value will make the animation run faster or slower (although the counterValue may also be used to control the speed, and in some cases better at it)

}

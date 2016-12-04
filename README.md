# js-bounce-animation-alternate-version

This is an alternate version of my javascript bouncing animation (which can be found at - https://github.com/S1lentEchoes/js-bounce-animation ).

As I stated in all my other repositories - The first thing that you will probably notice is that it is HEAVILY commented. This was intentional (yes, even to this extreme degree), mostly just for myself. I am still fairly new to coding, and multiple times in the past when I have gone back to some of my previous work I would always have a hard time understanding what my code meant. So along with relentlessly detailing everything that I was doing in the code, I also tried to capture the mindset that I had while I was coding it (or rather, why I coded it the way that I did).

This also has the added benefit of helping to remember this information without the need for comments - sort of like when you write something down to remember it, and the act of writing it down is what helped you remember it. With the only downside being the time taken to write the comments (since minifying removes all of the extraneous content), I saw no reason not to.

This essentially works the exact same way as my other function, except that it does not require the use of my css-animation.js function (which can be found at - https://github.com/S1lentEchoes/css-animation ).  Instead it uses it's own interval loop to do the animating itself.  I created my css-animation function specifically for extensibility/reusability, so I have since started using bounce.js ( https://github.com/S1lentEchoes/js-bounce-animation ) as my main function for bouncing animations.  I thought this function was worth keeping either for playing around with, or in case it was ever needed.

A calling function is needed to intialize this function, which serves the purpose of gathering all the required information needed for making bounce.js work for that particular instance. In one case, I even had another initializing function to call my initializing function, which was wrapped inside an interval to create an infinite bounce (it was for the homepage of a project to bounce a scroll down arrow to indicate to the user that the page could be scrolled).

This will loop a number of times (defined by the initializing function), while decreasing the height of the bounce by a set amount (again, defined by the initializing function) after each "fall".

I think that about covers it, any more code explanations that may be needed can easily be found inside the file's comments. I have included both the normal version, and the minified version.

As mentioned previously, my main bounce function that I now use exclusively can be found over at - https://github.com/S1lentEchoes/js-bounce-animation .

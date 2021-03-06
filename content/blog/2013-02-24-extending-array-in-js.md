---
title: How to extend an array with an array in javascript
author: Carl Bergquist
date: 2013-02-24
section: blog
---

I was working on a small side project when I wanted to extend an javascript array with another javascript array. I found this <a href="http://stackoverflow.com/a/1374131/79941">Stackoverflow question</a> and it put a smile on my face because I think this is a good example of the power javascript provides.

I'm gonna try to explain how it works.
push() adds and element to an array ex

<pre><code class="language-javascript">    var a = [ 1, 2 ];
    a.push(3);
    console.log(a);
    // [ 1, 2, 3 ]</code></pre>

But you can also give push more parameters. ex

<pre><code class="language-javascript">    var a = [ 1, 2 ];
    a.push(3, 4);
    console.log(a);
    // [ 1, 2, 3, 4 ]</code></pre>

What apply does is that it allow you to execute an mehtod on another object. ex

<pre><code class="language-javascript">    var sparkles = {
        name: 'Sparkles',
        sayHello: function() {
            console.log('Hi. My name is ' + this.name)
        }
    };

    var rainbowdash = {
        name: 'rainbowdash'
    };

    sparkles.sayHello.apply(rainbowdash);
    // 'Hi. My name is rainbowdash'</code></pre>

Apply also takes a second argument which is an array of arguments that
should be passed to the invoked method.

<pre><code class="language-javascript">    var sparkles = {
        name: 'Sparkles',
        sayHello: function(phrase, who) {
            console.log(phrase + ' ' + who + '. My name is ' + this.name);
        }
    };

    sparkles.sayHallo.apply(rainbowdash, [ 'Hi', sparkles' ]);
    // 'Hi sparkles. My name is rainbowdash'</code></pre>

So what happens is..
<pre><code class="language-javascript">    a.push.apply(a, b) turns into a.push(4, 5, 6);</code></pre>

Awesome!
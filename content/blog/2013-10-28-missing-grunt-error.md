---
title: Missing grunt error output in when using powershell
author: Carl Bergquist
date: 2013-10-28
section: blog
---

<p>
If you're using grunt in a powershell script for continues integration you might run into issues with the error output. It's because of a bug regarding subprocess and <a href="https://github.com/joyent/node/issues/3871">stdout flushing in subprocess</a>
</p>
<p>
<span class="bold">Solution</span>:
Instead of writing directly to stdout we should pipe all output to a file, use the windows command type to output it and then delete the file. Like this.
</p>
<pre>
  <code class="language-powershell">
grunt build --no-color > grunt.tmp
type grunt.tmp
del grunt.tmp
  </code>
</pre>



<p><span class="bold">Why?</span> When a subprocess breaks with an error is has not yet flushed all errors to the output since it will be done async. But the father process will kill the process and discard what ever it says afterwards. Which leaves us in a annoying state since why don't know why something failed.</p>

<p>
But when we pipe the output to a file the node process will not do it async and the stdout will be sent to the father process before the error code.</P>
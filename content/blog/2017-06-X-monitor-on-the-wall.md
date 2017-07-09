---
title: Monitor on the wall
author: Carl Bergquist
date: 2017-06-20
section: blog
draft: true
---

<quote>mirror mirror on the wall</quote>


<pre>
<code class="docker">
  FROM alpine
  ADD main /
  CMD ["/main"]
</code>
</pre>

Building the container works fine but once I try to run it I get this error:

<pre>
<code class="bash">
  standard_init_linux.go:178: exec user process caused "no such file or directory"
</code>
</pre>

Turns out that to run go process in alpine you need to set CGO_ENABLED to 0
<pre>
<code class="bash">
  CGO_ENABLED=0 go build -a -installsuffix cgo -o main .t
</code>
</pre>



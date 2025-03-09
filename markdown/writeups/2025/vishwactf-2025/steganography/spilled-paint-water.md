# Spilled Paint Water

Challenge description:

> Oops! I accidentally spilled paint all over my canvas. Now, the colors have blended too well :(
> Can you restore my lost artwork?

Alrighty, here we're given a SVG image, and we have to find something in it. Here's the SVG.

![the SVG](assets/canvas.svg)

Hm, very blue. Now, if you didn't know, an SVG image is an XML-based image format, meaning we can actually edit it all as a XML file. Here's the code for it:

```xml

<svg id="eEnmxFAjcr61"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" project-id="325d788ad90b4729a3b39f752dd4d05d" export-id="a48c1b27901f4ee7a8d074ff5e6709e9" cached="false">
	<clipPath id="clipArea">
		<rect x="1000" y="1000" width="200" height="200"/>
	</clipPath>
	<g clip-path="url(#clipArea)">
		<style>
      svg {
    background-color:#a2b5e0  ;
  }
    </style>
		<line x1="7.865168" y1="-4.868914" x2="-7.865168" y2="4.868914" transform="translate(23.782772 74.531835)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-7.865168" y1="-4.494382" x2="7.865168" y2="4.494382" transform="translate(23.782772 83.895131)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="7.865168" y1="-6.367041" x2="-7.865168" y2="6.367042" transform="translate(23.782772 94.756555)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-12.546817" x2="0" y2="12.546817" transform="translate(48.876404 82.209738)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-10.486891" y1="0" x2="10.486892" y2="0" transform="translate(47.378277 69.662921)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-10.11236" x2="0" y2="10.11236" transform="translate(57.865169 84.644195)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-8.988764" y1="0" x2="8.988764" y2="0" transform="translate(66.853933 74.531835)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-4.681648" x2="0" y2="4.681648" transform="translate(75.842697 79.213483)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-8.988764" y1="0" x2="8.988764" y2="0" transform="translate(66.853933 84.644195)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.741573" y1="-5.430712" x2="6.741573" y2="5.430712" transform="translate(64.606742 89.325843)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-12.546817" x2="0" y2="12.546817" transform="translate(81.835206 82.209738)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-7.490636" y1="0" x2="7.490637" y2="0" transform="translate(89.325843 69.662921)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-14.794008" x2="0" y2="14.794008" transform="translate(96.81648 79.962547)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-7.490637" y1="0" x2="7.490637" y2="0" transform="translate(89.325843 94.756555)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-0.374532" y1="-14.794008" x2="0.374532" y2="14.794008" transform="translate(108.426966 79.962547)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="4.494382" y1="-6.273409" x2="-4.494382" y2="6.273409" transform="translate(113.29588 75.93633)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-5.243446" y1="-6.273409" x2="5.243446" y2="6.273409" transform="translate(118.539326 88.483147)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="1.123595" y1="-12.546817" x2="-1.123595" y2="12.546817" transform="translate(130.898877 82.209738)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-10.112359" y1="0" x2="10.112359" y2="0" transform="translate(139.887641 65.168539)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-3.932585" y1="0.702247" x2="3.932584" y2="-0.702247" transform="translate(135.955057 75.234083)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.928839" y1="0" x2="6.928838" y2="0" transform="translate(137.827716 89.325843)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0.374532" y1="-11.985019" x2="-0.374532" y2="11.985019" transform="translate(118.164794 127.340824)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.741573" y1="-9.737828" x2="6.741573" y2="9.737828" transform="translate(125.280899 125.093633)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-0.561798" y1="-13.857678" x2="0.561797" y2="13.857678" transform="translate(130.33708 120.973783)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-10.486891" y1="0" x2="10.486892" y2="0" transform="translate(168.726591 89.325843)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-8.2397" y1="0" x2="8.2397" y2="0" transform="translate(105.05618 139.325843)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.741573" y1="0" x2="6.741573" y2="0" transform="translate(151.498127 134.831461)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-13.857678" x2="0" y2="13.857678" transform="translate(158.2397 120.973783)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-10.486891" y1="0" x2="10.486892" y2="0" transform="translate(168.726591 107.116105)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-10.486891" y1="0" x2="10.486892" y2="0" transform="translate(168.726591 115.355805)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-10.112359" x2="0" y2="10.112359" transform="translate(183.707865 117.228465)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="0" y1="-10.112359" x2="0" y2="10.112359" transform="translate(192.696629 117.228465)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-5.99251" y1="0" x2="5.992509" y2="0" transform="translate(198.689139 127.340824)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-0.749064" y1="-10.112359" x2="0.749064" y2="10.112359" transform="translate(211.423221 117.228465)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.741573" y1="0" x2="6.741573" y2="0" transform="translate(218.913858 127.340824)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
		<line x1="-6.835206" y1="0" x2="6.835206" y2="0" transform="translate(144.662921 134.831461)" fill="none" stroke="#a2b5e4" stroke-width="3"/>
	</g>
</svg>

```

So here I see a few issues, the first is that the `background-color` element is washing out all of the lines, since it is the same color as they are. To remedy this you can simply comment it out using the `/* comment *\` syntax.

However, this just gives us a blank image, which brings me to the next thing about this I see. The `<rect  x="1000"  y="1000"  width="200"  height="200"/>` defines where we can see the image, but in the first element the image is defined as taking place at `viewBox="0 0 300 300"`, so we'll need to edit the `rect` tag to capture those values. Alternatively you could've seen that in the `line` tags, some of the `transform` elements fell outside of the defined range. Regardless, lets look at what the code should look like now.

```


```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NzYzMTQ1MzUsNDI2ODA3MzAxLDg2OT
czNTY2NV19
-->
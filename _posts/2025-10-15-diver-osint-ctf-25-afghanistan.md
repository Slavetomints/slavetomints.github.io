---
title: Afghanistan
date: 2025-10-15
categories:
  - Capture The Flags
  - Diver OSINT CTF 2025
tags:
  - ctf
  - diver osint ctf 2025
  - osint
  - writeups
description: Diver OSINT CTF 2025 Afghanistan Challenge
image:
  path: /assets/img/diver25/afghanistan/basketball.png
  alt: two soldiers playing basketball
  post: false
---


> Challenge description:
>
>When and where was the photo shown at 65-67 seconds in this video taken?
Flag format: Diver25{location name_YYYY-MM-DD} (location name should be in English)
For example, if it was taken at Camp Darby on June 5, 2025, it would be Diver25{Camp Darby_2025-06-05}.
{: .prompt-info }

okay, so the photo we're looking for is this:
![two soldiers playing basketball](/assets/img/diver25/afghanistan/basketball.png)

And after throwing the image into Google images, we were able to find this link: `https://www.gettyimages.com/detail/news-photo/two-us-soldiers-from-1st-infantry-division-play-a-game-of-news-photo/1248038111`

![the getty images site](/assets/img/diver25/afghanistan/getty-images.png)

The site even provides a description of the photo too!
> TOPSHOT - Two US soldiers from 1st Infantry Division play a game of basketball at ISAF's Camp Bostick in Naray, in Afghanistan's eastern Kunar province on April 16, 2009. The ISAF deployment numbers more than 58,000 troops from 42 countries, according to its latest information. It works alongside a US-led coalition that is estimated to number around 10,000 although the figure is not public. AFP PHOTO/LIU Jin (Photo by LIU JIN / AFP) (Photo by LIU JIN/AFP via Getty Images)

Following the flag format, let's submit the flag!

FLAG: `Diver25{Camp Bostick_2009-04-16}`
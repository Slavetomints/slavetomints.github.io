---
title: The K-12 Cyber Isssue
date: 2025-11-18
categories:
  - Blog
tags:
  - blog
  - data
  - privacy
  - school
  - cybersecurity
description: Who's protecting the schools?
---

On May 24th, 2022, a gunman walked into Robb Elementary School, part of the Uvalde Consolidated Independent School District (UCISD). He killed 19 students, two teachers, and injured 17 other people in an attack that shocked the nation.[^1]

More than three years later, UCISD would face another kind of attack, one not carried out with weapons, but with code.

On September 12th, 2025, UCISD was attacked again with a ransomware attack[^2][^3], taking out phone systems, HVAC, and the network. The school had to shut down for four days as it worked to bring its systems back online and remove the ransomware[^4]. 

But even then, it's not over. What if the attackers are still in the network? What if they're waiting to strike again? How much data, if any, was taken? Who's to blame for this attack? How does a school district with a five-person IT team[^5] recover from this, and prevent it from happening again?

## The Issue

K–12 education faces a growing and underprepared threat: cyber attacks.

Between 2016 and 2022, K12 SIX, a non-profit dedicated to K-12 cybersecurity, recorded 1,619 incidents involving schools, including ransomware, phishing (that results in data loss), DoS/DDoS, data breaches, and other types of attacks.[^6]

The 2025 CIS MS-ISAC K-12 Cybersecurity Report[^7] studied 5,000 K-12 institutions across the country, and uncovered that 82% of the schools that responded went through a cyber incident, with more than 9,300 confirmed incidents total. MDR Education reports that there are approximately 115,171 K-12 institutions in the United States[^8]. Assuming the sample is statistically representative, extrapolating that data leads to almost 215,000 security incidents across the country's schools.

The most troubling of all are the ransomware attacks, where groups like 'PYSA', 'DoppelPaymer/Grief', and 'Vice Society'[^9] target schools during crucial times such as exam weeks, graduation, etc. The critical timing of the attacks ups the ante on school districts to pay their ransom, or else they won't have their network during the times they need it the most.

So why do they do it? Why do cybercriminals attack schools with phishing campaigns and ransomware, and DDoS them until their network is nowhere to be seen on the Internet?

The answer is simple: They're often seen as easy targets.

In a report, the Economic Policy Institute showed that public school funding is [at an all-time low](https://files.epi.org/uploads/302637.pdf)[^10], and with political leaders fighting to cut the Department of Education, the funding will take another hit.

This would force schools to stretch their already-thin resources even further. For some schools that serve wealthier neighborhoods, this might not have a major impact. But for rural and low-income schools, this could be a catastrophic blow to their operations, and what little cybersecurity presence there might have been at the school could be completely blown to dust.

It's well known that perfect security doesn't exist in today's increasingly connected world. Much akin to the old saying: "You don't need to be faster than the bear, just faster than your friends". If you want a fully secure network, you have to remove the network; it's just impossible to do. So instead, you try to make yourself harder to hack than the other guy.

![faster than the friend](/assets/img/blog/k12-cyber-issue/faster-than-the-bear.jpg)
*The current state of cybersecurity*

The issue with this approach is that it often leaves the slowest member behind, which is often the case for schools.

## The Solution

You might already be thinking of ways to solve this problem. And one of the most promising ones I've seen is gaining traction around the country: **JCSOCs (Joint Cyber Security Operations Center).**

Now it's pretty simple to throw more money at the problem, and why shouldn't we?

Well, throwing money at an issue doesn't always work, and even then, it's not a long-standing solution. Money doesn't solve the issues that small districts face with burnout and a lack of local talent. 

Besides, we've seen implementations of JCSOCs in these situations around the country, and it's very promising. 

**North Dakota** started collaborations with agencies outside of the state in 2021.[^11] The purpose of their program is to "enhance cybersecurity capabilities, collaboration, and response across multiple states".[^12]  This allows agencies from all over the country to collaborate and share threat intelligence, resources, and personnel to help make everyone safer. Something notable about North Dakota's JCSOC is that it allows groups to also share their tools and techniques with groups that might not be as mature in the cybersecurity field. [^13]

**New York** also fields their own JCSOC within the state, bringing together "federal, state, city, and county governments, critical businesses and utilities, and state entities like Division of Homeland Security and Emergency Services, Office of Information Technology Services, New York State Police, MTA, Port Authority of New York and New Jersey, the New York Power Authority, among others."[^14] Once again, another great example of JCSOCs being used to share ideas and resources among many groups who couldn't fund it on their own.

So this is where we bring schools into the picture. If you can get a significant number of schools together into one JCSOC, you'd be able to create a massive network of resources for people to share around. This would allow for all schools, regardless of funding level or staffing, to be able to get the same level of security, making it harder for an attacker to take advantage of underpreparedness and limited tech savviness.

Of course, it still would need to be seen with how easily a school could integrate into a JCSOC, and there are constraints around politics, funding, and policy. But I believe that if we work together with the goal of a better future, then we'll be able to see increased security across the K-12 sector.

## Sources

[^1]: “Uvalde School Shooting.” Wikipedia, Wikimedia Foundation, 18 Nov. 2025, [en.wikipedia.org/wiki/Uvalde_school_shooting](https://en.wikipedia.org/wiki/Uvalde_school_shooting).

[^2]: Hernandez, Erica, and Misael Gomez. “After Uvalde CISD Cancels Classes Due to Ransomware Attack, FBI Outlines Growing Threat.” _KSAT_, KSAT San Antonio, 17 Sept. 2025, [www.ksat.com/news/local/2025/09/16/after-uvalde-cisd-cancels-classes-due-to-ransomware-attack-fbi-outlines-growing-threat/](https://www.ksat.com/news/local/2025/09/16/after-uvalde-cisd-cancels-classes-due-to-ransomware-attack-fbi-outlines-growing-threat/)

[^3]: Warner, Jessica. “No Data Breached in Uvalde CISD Cyber Attack, District Says Classes to Resume Sept. 22.” _WOAI_, WOAI, 20 Sept. 2025, [news4sanantonio.com/news/local/no-data-breached-in-uvalde-cisd-cyber-attack-district-says-classes-to-resume-sept-22#](https://news4sanantonio.com/news/local/no-data-breached-in-uvalde-cisd-cyber-attack-district-says-classes-to-resume-sept-22#).

[^4]: Pluna@Ulnnow.com. “All UCISD Campuses Closed This Week after Cyberattack - Uvalde Leader News.” _Uvalde Leader News_, Uvalde Leader News, 13 Sept. 2025, [www.uvaldeleadernews.com/articles/all-ucisd-campuses-closed-this-week-after-cyberattack/](https://www.uvaldeleadernews.com/articles/all-ucisd-campuses-closed-this-week-after-cyberattack/).

[^5]: “Directory.” _Uvalde Consolidated Independent School District_, Uvalde Consolidated Independent School District, [www.ucisd.net/directory?utf8=%E2%9C%93&const_search_group_ids=&const_search_role_ids=1&const_search_keyword=technology&const_search_first_name=&const_search_last_name=](https://www.ucisd.net/directory?utf8=%E2%9C%93&const_search_group_ids=&const_search_role_ids=1&const_search_keyword=technology&const_search_first_name=&const_search_last_name=). Accessed 18 Nov. 2025.

[^6]: “The K12 Cyber Incident Map.” _K12 SIX_, K12 SIX, [www.k12six.org/map](https://www.k12six.org/map). Accessed 18 Nov. 2025.

[^7]: Center for Internet Security, in partnership with Consortium for School Networking. _2025 CIS MS-ISAC K-12 Cybersecurity Report: Where Education Meets Community Resilience_, Center for Internet Security, 2025, [https://learn.cisecurity.org/2025-k12-cybersecurity-report-download](https://learn.cisecurity.org/2025-k12-cybersecurity-report-download). Accessed 18 Nov. 2025.

[^8]: Team, MDR Marketing. “How Many Schools Are in the U.S.?” _MDR Education_, MDR Education, 2 May 2024, [mdreducation.com/how-many-schools-are-in-the-u-s/](https://mdreducation.com/how-many-schools-are-in-the-u-s/).

[^9]: K12 Security Information eXchange. _State of K-12 Cybersecurity: Year in Review_, K12 SIX, 2022, [https://static1.squarespace.com/static/5e441b46adfb340b05008fe7/t/6228bfe3f412c818293e16e1/1646837732368/StateofK12Cybersecurity2022.pdf](https://static1.squarespace.com/static/5e441b46adfb340b05008fe7/t/6228bfe3f412c818293e16e1/1646837732368/StateofK12Cybersecurity2022.pdf). Accessed 18 Nov. 2025.

[^10]: Wething, Hilary, and Josh Bivens. Economic Policy Institute, 2025, _Economic Policy Institute Research and Ideas for Shared Prosperity_, [https://files.epi.org/uploads/302637.pdf](https://files.epi.org/uploads/302637.pdf). Accessed 18 Nov. 2025.

[^11]: _HB 1417_, 2021. [https://ndlegis.gov/assembly/67-2021/regular/bill-overview/bo1417.html](https://ndlegis.gov/assembly/67-2021/regular/bill-overview/bo1417.html)]. Accessed 18 Nov. 2025.

[^12]: North Dakota Information Technology, 2021, _Cybersecurity Joint Cyber Security Operations Center (JCSOC) 2021-Present_, [https://www.nascio.org/wp-content/uploads/2023/08/ND_Cybersecurity.pdf](https://www.nascio.org/wp-content/uploads/2023/08/ND_Cybersecurity.pdf). Accessed 18 Nov. 2025.

[^13]: Kraft, Bella. “North Dakota Founded Multi-State Cyber Security Task Force Grows.” _Https://Www.Kfyrtv.Com_, KFYR TV, 18 Aug. 2022, [www.kfyrtv.com/2022/08/18/north-dakota-founded-multi-state-cyber-security-task-force-grows/](https://www.kfyrtv.com/2022/08/18/north-dakota-founded-multi-state-cyber-security-task-force-grows/).

[^14]: “Joint Security Operations Center (JSOC).” _Office of Information Technology Services_, Office of Information Technology Services, 22 Feb. 2022, [its.ny.gov/joint-security-operations-center-jsoc](https://its.ny.gov/joint-security-operations-center-jsoc).
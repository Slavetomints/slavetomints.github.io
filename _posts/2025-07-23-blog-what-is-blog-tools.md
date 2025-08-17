---
title: What is blog-tools?
date: 2025-07-23
categories:
  - Blog
  - blog-tools
tags:
  - blog-tools
  - blog
  - ruby
  - gem
description: What is the blog-tools gem, and why I decided to make it
---

## The Issue
Okay, so I manage this blog by myself, and it can get tedious at times, trying to remember all of the things I was to write about, making sure I'm using a consistent style as I set up my posts, etc and etc.

And while yes I'm sure there are plugins on Obsidian for all of my issues, but I don't really learn anything from just installing the nth plugin.

### What I Need
So what do I need? Well, I'm going to start with the following:
- The ability to create posts off of templates and edit only the features i need to edit
- The ability to have lists of the posts that I want to write in the future.

### Previous Solutions
Now, I have made scripts that can take care of those for me, but they are rudimentary and not very flexible. The first script I made was for keeping track of my writeups to do, and looks like this:

```sh
# Writeup function
function writeups() {
  if [ "$1" == "-s" ] || [ "$1" == "--short" ]; then
    echo "Type 'writeups' to see writeups that still need to be completed"
    output=$(writeups)
    count=$(echo "$output" | wc -l)
    echo "Current count: $count"
    return
  fi
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
echo "Challenge name - CTF"
}
```

As you can see, it got out of hand really quickly, with enough writeups on the to-do list, it becomes an unsightly chore to deal with.

The other thing I needed was some way to standardize the front matter of my posts. If you don't know already: Jekyll is a static-site generator, and in my case I make my posts in markdown files, and then it generates the `html` from that. The way I'm able to get the tags, and categories and everything is through something called `front matter`. It is a `YAML` block that looks similar to this:

```markdown
---
title: What is blog-tools?
date: 2025-07-23
categories:
  - Blog
  - blog-tools
tags:
  - blog-tools
  - blog
  - ruby
  - gem
description: What is the blog-tools gem, and why I decided to make it
---
```

Now, in order to make viewing my blog more pleasant for you guys, I need to make sure to properly tag and categorize all of my posts. Since most of my posts are writeups for the CTFs I do, I've only made a tool for that, and it actually serves me quite well.

```sh
function blog-header() {
  if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    echo "Usage: ${FUNCNAME[0]} [CTF Name] [Category Name] [Challenge Name]"
    return
  fi

  echo "---"
  echo "title: $3"
  echo "date: $(date -I)"
  echo "categories: [Capture The Flags, $1]"
  echo "tags: [ctf, ${1,,}, ${2,,}, writeups]"
  echo "description: $1 $3 Challenge"
  echo "---"
  echo ""
  echo ""
  echo "> Challenge description:"
  echo "> "
  echo "> "
  echo "{: .prompt-info }"
}
```

But as I write about more and more things, keeping track of an alias for every different type is going to get to be too complicated. So I'm in need of a better idea.


## The Solution
Introducing `blog-tools`, my attempt at solving all of my issues, and hopefully someone else's issues too.

Here are my goals for the project:

### Maintaining Lists of Ideas
So like I said earlier, I need a way to keep track of all of my different ideas and future plans for posts. What I was thinking was having a way to create a list, add ideas to it, and then add information to those ideas, such as what the tags are going to be, or who the author is, or where the post's content is located with the filesystem. I'd also want to be able to track the status of posts, mark them complete or in progress if needed. 

### Generating Writeups
Alright, so like I had with the front matter, I would want to be able to generate posts using templates, and just have a single template per type of post, rather than have a whole entire command for each type of template. Another cool thing to have would be the ability to generate posts based on the lists we create, and use the information stored in those, like tags and path, to help with the generation.

## blog-tools
### Why Ruby?
I like Ruby, and want to get better at using it to make CLI applications, so it seemed like an obvious choice. I also wanted to create a gem, so its just another reason to make this in Ruby.

### The Future
So now, with my ideas in hand, I'll start working on my new project. I will be documenting my work here as I go. Stay tuned for other things, and make sure to leave a comment if you want a specific feature or improvement to the project.

The repository is hosted on [GitHub](https://github.com/Slavetomints/blog-tools)

And you can find the page on [RubyGems](https://rubygems.org/gems/blog-tools)
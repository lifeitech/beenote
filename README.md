# BeeNote - Full stack CRUD web application built with Next.js 13

***New!*** ChatGPT is now integrated into this app. You can try AI writing by going to the grammar note or custom note editor. 

***Tech stack: Next.js 13 + Tailwind + DaisyUI + Tiptap + PocketBase + AWS SES + ChatGPT***

BeeNote is a web application for taking language learning notes. 

<img src="screenshot.png" style="zoom:80%;" />

## Features

- Next.js 13's [app directory](https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory) for routing.
- CRUD operations for accounts and user's data.
- Audio recording and file uploading.
- [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling.
- Rich text editor built with [Tiptap](https://tiptap.dev/).
- [PocketBase](https://pocketbase.io/) for database and user authentication.
- [AWS SES](https://aws.amazon.com/ses/) for email sending.
- [ChatGPT](https://platform.openai.com/docs/introduction) for AI writing.
- Dark theme support with [React's useContext hook](https://react.dev/reference/react/useContext).

For more details see this [blog post](https://lifeitech.github.io/posts/beenote/). 

## TODO

- [ ] Add more signup options with OAuth2 providers.
- [ ] Implement batch delete when PocketBase implemented such functionality.
- [ ] Add helpful features like keypad for different languages.
- [ ] Implement drag-and-sort for alphabets and vocabularies.

# BeeNote - Full stack CRUD application built with Next.js 13

***New!*** ChatGPT is now integrated into this app. You can try AI assistant by going to the grammar note or custom note editor. 

***Tech stack: Next.js 13 + Tailwind + DaisyUI + Tiptap + PocketBase + AWS SES + ChatGPT***

BeeNote is a full stack web application for taking language learning notes, built with Next.js 13. It utilizes Next.js 13's latest [app directory](https://nextjs.org/blog/next-13) feature for routing.

<img src="screenshot.png" style="zoom:80%;" />

It is an app that can perform all the CRUD (create, read, update and delete) operations. First, create an account in the [signup](https://beenote.app/signup) page. Then after you have logged in with your account, you can add, update and delete alphabet and vocabulary entries on the server, with support for audio recording and image uploading. You can also edit and save grammar notes and custom notes with a rich text editor.

For more details see this [blog post](https://lifei.tech/posts/beenote/). 

## Tech Stack

- Next.js 13 further blurs the line between frontend and backend. It provides routing, server-side rendering, client-side navigation, image optimization and more.

- TailwindCSS and DaisyUI are used for styling.

- [Tiptap](https://tiptap.dev/) is used to build the rich text editor.

- [PocketBase](https://pocketbase.io/) for database and user authentication. Note that PocketBase is still in active development. Some functionalities like batch delete are still to be implemented.

- [AWS SES](https://aws.amazon.com/ses/) for email sending.

- [ChatGPT](https://platform.openai.com/docs/introduction) for AI writing.

## TODO

- [ ] Add helpful features like keypad for different languages.
- [ ] Add more signup options with OAuth2 providers.
- [ ] Implement drag-and-sort for alphabets and vocabularies.

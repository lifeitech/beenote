import getclient from '@utils/pb-server';
import Tiptap from '@utils/Editor';
import Title from './UpdateTitle';

export const revalidate = 0;

export default async function Home({ params }: any) {
  const client = getclient();
  const document = await client.collection('grammar').getFirstListItem(`lang="${params.lang}" && url="${params.url}"`);
  const id = document.id;
  const title = document.title;
  const url = document.url;
  const content = document.contentJSON;


  return (
    <div>
      {/* <h2 className="text-3xl font-bold mt-0 mx-4 mb-4 bg-base-100">{title}</h2> */}
      <Title id={id} title={title} url={url} lang={params.lang}/>
      <Tiptap content={content} collection={'grammar'} id={id} />
    </div>
  );
}

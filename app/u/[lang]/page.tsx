import Block from "@utils/Block";

export default async function Home({ params }: any) {
  const lang = params.lang;
  return (
    <div className="flex flex-col gap-10 p-5">
    <Block link={`/u/${lang}/alphabet`}>Alphabet</Block>
    <Block link={`/u/${lang}/vocabulary`}>Vocabulary</Block>
    <Block link={`/u/${lang}/grammar`}>Grammar</Block>
    <Block link={`/u/${lang}/speaking`}>Speaking</Block>
    <Block link={`/u/${lang}/custom`}>Custom</Block>
    </div>
    )
}




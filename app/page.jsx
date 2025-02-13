import Feed from "@components/Feed";
const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">Discover & Share</h1>
                <br className="max-md:hidden" />
                <span className="orange_gradient">AI-Powered Prompts</span>
                <p className="desc text-center">
                    Promptpy is an open-source AI prompting tool fo modern wold to discover, create and share creative prompts
                </p>

                <Feed />
        </section>
    )
}

export default Home
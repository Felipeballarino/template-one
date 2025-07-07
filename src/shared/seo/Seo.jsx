import { Helmet } from "react-helmet-async";

const Seo = ({ title, description }) => {

    return (
        <Helmet>
            <title>{title} | Template</title>
            <meta name="description" content={description} />
            <link rel="canonical" href="https://template-one-yirv.vercel.app/" />
        </Helmet>
    )
}

export default Seo;

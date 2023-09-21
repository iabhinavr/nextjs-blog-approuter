import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { getCategoryDetails, getCategorySlugs, getPostList } from "../../../lib/posts";
import PostList from "../../../components/PostList";

export async function generateStaticParams() {
    const categories = await getCategorySlugs();

    const paths = categories.map((category) => (
        {
            categoryName: category.slug
        }
    ));

    return paths;
}

export async function generateMetadata({ params }) {

    const categoryDetails = await getCategoryDetails(params.categoryName);

    return {
        title: categoryDetails.name,
    }
}

export default async function CategoryArchive({ params }) {

    const initialPosts = await getPostList(null, { key: "categoryName", value: params.categoryName });
    const categoryDetails = await getCategoryDetails(params.categoryName);

    return (
        <>
            <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
                <div className="absolute bg-slate-900 opacity-40 inset-0 z-0"></div>

                <SiteHeader className="header-category z-10 relative" />

                <h1 className="text-4xl text-center text-slate-100 relative z-10 py-8">
                    Category Archive: {categoryDetails.name}
                </h1>

                <p className="relative z-10 text-center text-slate-200 text-2xl">
                    Found {categoryDetails.count} posts under this category
                </p>

            </div>
            <PostList initialPosts={initialPosts} />
            <SiteFooter />
        </>
    );
}
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlogSingle } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {

    const {id} = useParams();

    const {loading, blog} = useBlogSingle({
        id: id || ""
    });


    if(loading){
        return(
            <div>
                Loading.
            </div>
        )
    }

    if(!blog){
        return(
            <div>
                Blog not found.
            </div>
        )
    }

    return(
        <div>
            <Appbar />
            <FullBlog blog={blog} />
        </div>
    )
}
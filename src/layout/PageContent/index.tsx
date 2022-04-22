import { FC } from "react";
import "./page-content.css";

const PageContent: FC = ({ children }) => {
    return (
        <main id="page-content" className="py-2 px-1">
            {children}
        </main>
    );
}

export default PageContent;

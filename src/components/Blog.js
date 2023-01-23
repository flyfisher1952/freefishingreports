import React from "react";
import parse from "html-react-parser";
import { format } from "date-fns";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import { UseFetchBlogs } from "./hooks/BlogHooks";

function Blog() {
    const [blogs, isLoading] = UseFetchBlogs("http://localhost:3033/blog");

    const LoadingDisplay = () => {
        return (
            <>
                <div className="container-fluid">
                    <div>
                        <Row>
                            <Col className="text-center align-middle">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        );
    };

    const LoadedDisplay = () => {
        return (
            <>
                <div>
                    {blogs.map((blog) => (
                        <Row className="blog-table-row" key={blog.id}>
                            <Col className="blog-author-col" xs={1}>{blog.author}</Col>
                            <Col xs={2}>{format(new Date(blog.created_date), "dd MMM yyyy")}</Col>
                            <Col xs={9}>{parse(blog.body)}</Col>
                        </Row>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="container-fluid h-100">
            <div className="row bordered-component">{isLoading ? <LoadingDisplay /> : <LoadedDisplay />}</div>
        </div>
    );
}

export default Blog;

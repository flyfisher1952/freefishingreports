import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap";
import { Table } from "react-bootstrap";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getBlogs = () => {
        setIsLoading(true);
        axios
            .get("http://localhost:3000/blog/")
            .then((response) => response.data)
            .then((data) => {
                setBlogs(data);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getBlogs();
    });

    const LoadingDisplay = () => {
        return (
            <>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <h4>Loading...</h4>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    };

    const LoadedDisplay = () => {
        return (
            <>
                <Table>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>{blog.author}</td>
                                <td>{blog.created_date}</td>
                                <td>{blog.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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

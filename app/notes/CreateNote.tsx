"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from "pocketbase";

export default function CreateNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const create = async(e: React.FormEvent) => {
        const db = new PocketBase('http://127.0.0.1:8090');
        e.preventDefault();
        await db.collection('notes').create({
            title,
            content,
        });

        
        setContent('');
        setTitle('');

        router.refresh();
    }

    return (
        <form onSubmit={(e)=>create(e)}>
        <h3>Create a new Note</h3>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">
            Create note
        </button>
        </form>
    );
}
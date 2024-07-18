// GitHubUser.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
    name: string;
    login: string;
    bio: string;
    location: string;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    homepage: string;
}

const GitHubUser: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [userData, setUserData] = useState<User | null>(null);
    const [repoData, setRepoData] = useState<Repo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [invalidUser, setInvalidUser] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!search) return;

            try {
                setLoading(true);
                setError(null);
                setInvalidUser(false);

                const userResponse = await axios.get(`https://api.github.com/users/${search}`);
                setUserData(userResponse.data);

                const reposResponse = await axios.get(`https://api.github.com/users/${search}/repos`);
                const filteredRepos = reposResponse.data.filter((repo: Repo) => repo.homepage !== null);
                setRepoData(filteredRepos);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        setInvalidUser(true);
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError("An unknown error occurred");
                }
                setUserData(null);
                setRepoData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [search]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSearch(username);
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="p-2 border border-gray-400 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
                    Search
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">An error has occurred: {error}</p>}
            {invalidUser && <p className="text-red-500">Invalid user. Please try again with a valid username.</p>}
            {userData && (
                <div className="flex justify-between gap-6 w-full h-auto p-8 mt-9 rounded-lg">
                    <div className="h-[38vh] w-[30vw] flex gap-3 p-3 flex-wrap">
                        <h1 className="text-3xl font-bold">USER DETAILS</h1>
                        <div className="text-justify">
                            <p className="text-xl font-semibold">{userData.name}</p>
                            <p>
                                <span className="text-gray-500">{userData.login}</span>
                                <br />
                                {userData.bio}
                                <br />
                                {userData.location}
                            </p>
                        </div>
                    </div>
                    <div className="h-[62vh] flex justify-center text-left overflow-y-scroll">
                        <ul className="w-[50vw]">
                            <h1 className="text-3xl font-bold p-3">PROJECTS</h1>
                            {repoData.map((repo) => (
                                <li key={repo.id} className="mt-3 w-full px-3 py-2 rounded-md">
                                    {repo.name}:{" "}
                                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                        Live link
                                    </a>
                                    <p>{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitHubUser;

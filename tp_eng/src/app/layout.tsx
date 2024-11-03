import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserContextProvider from "@/context/UserContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "ProcessJur",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<style>{`
					html, body {
						height: 100%;
					}
				`}</style>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
				/>
			</head>
			<UserContextProvider>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between h-screen`}>
					<Header />
					<main className="flex-grow">{children}</main>
					<Footer />
				</body >
			</UserContextProvider>
		</html >
	);
}
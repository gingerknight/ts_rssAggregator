# Welcome to the Blog Aggregator

This is a simple RSS feed aggregator in TypeScript called "Gator", because aggreGATOR. It's a CLI tool that allows users to:

- Add RSS feeds from across the internet to be collected
- Store the collected posts in a PostgreSQL database
- Follow and unfollow RSS feeds that other users have added
- View summaries of the aggregated posts in the terminal, with a link to the full post

The RSS Aggregator utilizes a PostgreSQL database as the storage mechanism and [drizzle](https://orm.drizzle.team/docs/overview), a lightweight tool for tpe-safe SQL in Typescript. 

import React, { useState } from "react";
import { Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PostForm from "./forms/PostForm";
import Post from "./posts/Post";
import postImage from "assets/images/post_image.png";
import QuickFilters from "./quickFilters";
import Button from "./forms/Button";
import FormCard from "../../components/cards/FormCard";
import SearchForm from "./forms/SearchForm";

const posts = [
  {
    author: {
      name: "Jafaris Long",
      avatar: "jafaris Long",
      pv: "1,902",
      gv: "3,942",
      rank: "Default",
    },
    post: {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
      likes: 342,
      share: 342,
      date: "1 nov, 08:45",
      comments: [
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
      ],
    },
  },
  {
    author: {
      name: "Jafaris Long",
      avatar: "jafaris Long",
      pv: "1,902",
      gv: "3,942",
      rank: "Default",
    },
    post: {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
      likes: 342,
      share: 342,
      video: "testing",
      date: "1 nov, 08:45",
      comments: [
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
      ],
    },
  },
  {
    author: {
      name: "Jafaris Long",
      avatar: "jafaris Long",
    },
    post: {
      title:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
      likes: 342,
      share: 342,
      date: "1 nov, 08:45",
      image: postImage,
      comments: [
        {
          author: {
            name: "Jafaris Long",
            avatar: "jafaris Long",
          },
          likes: 342,
          share: 342,
          date: "1 nov, 08:45",
          body:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus… Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus…",
        },
      ],
    },
  },
];

export default () => {
  const [selectedFilter, setFilter] = useState("all");
  const classes = useStyle();
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <QuickFilters
              selectedFilter={selectedFilter}
              setFilter={setFilter}
            />
          </Grid>
          <Grid item xs={3} className={classes.postButtonGrid}>
            <Button label={"New Post"} />
          </Grid>
          {posts.map((post, index) => (
            <Grid item xs={12} key={index}>
              <Post data={post} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <FormCard title='Search filters' className={classes.searchForm}>
          <div>
            <Divider className={classes.divider} />
            <SearchForm />
          </div>
        </FormCard>
      </Grid>
    </Grid>
  );
};

const useStyle = makeStyles((theme) => ({
  postButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
  },
  divider: {
    margin: "10px 0 13px 0",
  },
  searchForm: {
    maxWidth: "314px",
  },
}));

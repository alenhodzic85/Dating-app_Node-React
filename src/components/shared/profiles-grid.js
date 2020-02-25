import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import MediaCard from './components/media-card';

const ProfilesGrid = ({
  classes,
  profiles,
  currentUserProfile,
  handleLike,
  type,
}) => {
  const [displayedProfiles, setDisplayedProfiles] = useState([]);
  const displayMoreProfiles = () => {
    setDisplayedProfiles(profiles.slice(0, displayedProfiles.length + 20));
  };
  useEffect(() => {
    displayMoreProfiles();
    // eslint-disable-next-line
  }, [profiles]);
  return (
    <div className={classes.wrapper}>
      <Container>
        <InfiniteScroll
          dataLength={displayedProfiles.length}
          next={displayMoreProfiles}
          hasMore
          loader={
            <div className={classes.progress}>
              <CircularProgress color="secondary" />
            </div>
          }
        >
          <Grid container spacing={3}>
            {_.map(displayedProfiles, profile => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                className={classes.center}
                key={profile.username}
              >
                <MediaCard
                  field={profile}
                  profile={currentUserProfile}
                  handleLike={handleLike}
                  type={type}
                />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default ProfilesGrid;

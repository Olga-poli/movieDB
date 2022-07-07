import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { fetchMovieDetails } from '../../store/actions/actions';
import MovieInfoItem from '../../components/MovieInfoItem';
import styles from './MovieInfo.module.scss';
import useTranslation from '../../components/hook-helpers';

const cx = classNames.bind(styles);

function MovieInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { movieID } = useParams();
  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);
  const { translate } = useTranslation();

  useEffect(() => {
    dispatch(fetchMovieDetails(Number(movieID)));
  }, []);

  const movieInfoClassName = cx('movieInfo');
  const backButtonClassName = cx('button', 'btn btn-secondary');

  return (
    <div>
      {isError ? (
        <h2>{translate('app-catalog-error')}</h2>
      ) : (
        <div>
          {isLoading
            ? (<h2>{translate('app-catalog-loading')}</h2>)
            : (
              <div className={movieInfoClassName}>
                <button onClick={() => history.goBack()} type="button" className={backButtonClassName}>
                  {translate('app-catalog-back-button')}
                </button>
                <MovieInfoItem key={movieID} movieID={movieID} />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
export default MovieInfo;

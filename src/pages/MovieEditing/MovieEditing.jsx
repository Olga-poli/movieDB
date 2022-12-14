import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { updateMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieEditing.module.scss';
import { useTranslation, useValidate } from '../../hooks';

const cx = classNames.bind(styles);

function MovieEditing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieID } = useParams();
  const { translate } = useTranslation();
  const validate = useValidate(translate);

  const nameInputRef = useRef(null);
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const currentMovieData = moviesItemsList.find(({ id }) => id === Number(movieID));

  const {
    title,
    poster_path: posterPath,
    overview,
  } = currentMovieData;

  const formik = useFormik({
    initialValues: {
      movieTitle: title,
      moviePosterPath: posterPath,
      movieOverview: overview,
    },
    validate,
    onSubmit: (values) => {
      const newMovieData = {
        title: values.movieTitle,
        poster_path: values.moviePosterPath,
        overview: values.movieOverview,
      };
      dispatch(updateMovieItem({ id: Number(movieID), newMovieData }));
      history.push(`/catalog/${movieID}`);
    },
  });

  const movieEditingClassName = cx('movieEditing');
  const backButtonClassName = cx('button', 'btn btn-secondary');
  const formClassName = cx('form');
  const inputBlockClassName = cx('inputBlock');
  const inputClassName = cx('form-control');
  const labelClassName = cx('form-label');
  const submitButtonClassName = cx('button', 'btn btn-primary');

  return (
    <div className={movieEditingClassName}>
      <button onClick={() => history.goBack()} type="button" className={backButtonClassName}>
        {translate('app-catalog-back-button')}
      </button>
      <h2>{translate('app-movie-edit-button')}</h2>
      <form
        onSubmit={formik.handleSubmit}
        className={formClassName}
      >
        <div className={inputBlockClassName}>
          <label htmlFor="title" className={labelClassName}>
            {translate('app-movie-edit-subtitle-title')}
          </label>
          <input
            ref={nameInputRef}
            onChange={formik.handleChange}
            value={formik.values.movieTitle}
            name="movieTitle"
            className={inputClassName}
            type="text"
            id="title"
            required
          />
          {formik.errors.movieTitle ? <div>{formik.errors.movieTitle}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="image" className={labelClassName}>
            {translate('app-movie-edit-subtitle-imageurl')}
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.moviePosterPath}
            name="moviePosterPath"
            className={inputClassName}
            type="text"
            id="image"
            required
          />
          {formik.errors.moviePosterPath ? <div>{formik.errors.moviePosterPath}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="description" className={labelClassName}>
            {translate('app-movie-edit-subtitle-description')}
          </label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.movieOverview}
            name="movieOverview"
            className={inputClassName}
            id="description"
            required
          />
          {formik.errors.movieOverview ? <div>{formik.errors.movieOverview}</div> : null}
        </div>
        <button className={submitButtonClassName} type="submit">
          {translate('app-movie-edit-form-submit-button')}
        </button>
      </form>
    </div>
  );
}

export default MovieEditing;

import { useState } from 'react';
import { usePromise } from './usePromise';

export const useFetch = function () {
  // is loading, is error, fetched data
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isError, setIsError] = useState<any>(false);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<any>(false);

  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();

  // check if a data variable is an actual object
  const isObject = function (dataVariable: any) {
    if (
      typeof dataVariable === 'object' &&
      !Array.isArray(dataVariable) &&
      dataVariable !== null
    ) {
      return true;
    } else {
      return false;
    }
  };

  type CustomFetchOptions = {
    isLoading: boolean;
    additionalCallTime: number;
    abortTimeoutTime: number;
  };

  // method
  const handleData = async function (
    url: string,
    fetchOptions: any = {},
    customFetchOptions: CustomFetchOptions
  ) {
    // set "is loading"
    if (customFetchOptions.isLoading === undefined) {
      customFetchOptions.isLoading = true;
    }
    // set "additional call time" timeout to 0 if not set
    if (customFetchOptions.additionalCallTime === undefined) {
      customFetchOptions.additionalCallTime = 0;
    }
    // set "abort timeout" time to 8000 ms if not set
    if (customFetchOptions.abortTimeoutTime === undefined) {
      customFetchOptions.abortTimeoutTime = 8000;
    }

    // abort
    const timer = setTimeout(() => {
      controller.abort();
    }, customFetchOptions.abortTimeoutTime);

    // try
    try {
      setIsLoading(customFetchOptions.isLoading);
      // set promise
      const promise = usePromise(customFetchOptions.additionalCallTime);

      // wait for additional response time. additional time is set when calling the method
      await promise;

      // if loading time gets exceeded
      if (controller.signal.aborted) {
        setIsError(false);
        setIsLoading(false);
        clearTimeout(timer);
        return Promise.reject(
          Error(
            `408. The loading time has been exceeded. Please refresh this page`
          )
        );
      }

      // response
      const response = await fetch(url, fetchOptions);

      // check if response is ok. if not throw error
      if (response.status !== 200 && response.status !== 201) {
        // throw new error with returned error messages
        throw new Error(`${response.status}. ${response.statusText}`);
      }

      // set variable for content type application/json
      const contentType: any = response.headers.get('content-type');
      // check if request is application/json in the request header
      if (contentType.includes('application/json')) {
        // convert to json
        const json = await response.json();
        // set fetched data
        setFetchedData(json);

        setIsError(false);
        setIsLoading(false);
        setIsSuccess(true);
        clearTimeout(timer);

        // return json
        return json;
      }

      setIsError(false);
      setIsLoading(false);
      setIsSuccess(true);
      clearTimeout(timer);

      // return fetched data
      return fetchedData;

      // catch
    } catch (err: any) {
      clearTimeout(timer);
      setIsLoading(false);
      setIsSuccess(false);
      const response = await fetch(url, fetchOptions);

      // abort fetch
      if (err.name === 'AbortError') {
        setIsError('Error fetching data: The fetch was aborted');
      }
      // handle errors
      if (err.name !== 'AbortError') {
        // set variable for content type application/json
        const contentType: any = response.headers.get('content-type');

        // check if request is application/json in the request header
        if (contentType.includes('application/json')) {
          // collect errors and convert errors to json
          const collectingErrorsJson = await response.json();

          // check if fetched data is a string
          if (typeof collectingErrorsJson === 'string') {
            setIsError(`${collectingErrorsJson}`);
          }

          // check if fetched data is an array
          if (Array.isArray(collectingErrorsJson)) {
            setIsError(`${collectingErrorsJson.join(' ')}`);
          }

          // check if fetched data is an object
          if (isObject(collectingErrorsJson)) {
            // errors received
            let errorsReceived: any = null;

            // check if "collecting errors json" contain an object named errors and make sure it is an object
            // convert errors received from object to array
            if (
              collectingErrorsJson.errors &&
              isObject(collectingErrorsJson.errors)
            ) {
              errorsReceived = Object.values(collectingErrorsJson.errors);
            }

            // if "collecting errors json" does not contain an object for errors
            // convert errors received from object to array
            if (!collectingErrorsJson.errors) {
              errorsReceived = Object.values(collectingErrorsJson);
            }

            // set error(s)
            setIsError(`${errorsReceived.join(' ')}`);
          }

          // end if content type is application/json
        }

        // check if request is application/json in the request header
        if (!contentType.includes('application/json')) {
          setIsError(`${err.message}`);
        }
      }

      // throw
      throw err;

      // end catch
    }

    // end fetch data method
  };

  // return
  return {
    handleData,
    fetchedData,
    isLoading,
    isSuccess,
    setIsLoading,
    isError,
    setIsError,
  };

  // end of use fetch method
};

export default useFetch;

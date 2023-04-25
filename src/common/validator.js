import Joi from 'joi';
import { InvalidParameterError } from '@/common/error';

export const validateCtx = (schema, ctx) => {
  const params = {
    ...ctx?.request?.query,
    ...ctx?.request?.body,
    ...ctx?.params,
  };
  const { value, error } = Joi.object(schema).validate(params);

  if (error) {
    const { details } = error;
    const message =
      details.length > 0 ? details[0].message : '요청 값 오류 입니다.';

    throw new InvalidParameterError(message, 400);
  }

  return value;
};

export const validateParams = (schema, parameters = {}, callerName) => {
  const { value, error } = Joi.object(schema)
    .unknown(true)
    .validate(parameters);

  if (error) {
    const { details } = error;
    const message =
      details.length > 0 ? details[0].message : '요청 값 오류 입니다.';

    throw new InvalidParameterError(
      `${message}${callerName ? ` at ${callerName}` : ''}`,
      500
    );
  }

  return value;
};

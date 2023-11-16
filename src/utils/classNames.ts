export const validationStyles = (
  validClasses: string | string[] = [],
  invalidClasses: string | string[] = []
) => {
  const validationTemplate = ':[&:not(:placeholder-shown)]:';

  const validClassNames = Array.isArray(validClasses) ? validClasses : [validClasses];
  const invalidClassNames = Array.isArray(invalidClasses) ? invalidClasses : [invalidClasses];

  return validClassNames.map(className => 'valid' + validationTemplate + className).join(' ') + ' ' + invalidClassNames.map(className => 'invalid' + validationTemplate + className).join(' ');
};
export const classNames = (...classNames: string[]) => classNames.map((className => className.trim())).join(' ').trim();

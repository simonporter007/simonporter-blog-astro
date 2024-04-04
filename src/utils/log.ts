export function log(text: string) {
  console.info(
    `%c[S%cx%cP] ${text}`,
    'font-family: sans; font-size: 14px;',
    'font-size: 12px; color: hsl(327 94% 58%); text-shadow: 0 0 21px hsl(327 94% 58%), 0 0 41px hsl(327 94% 58%), 0 0 46px hsl(327 94% 58%), 0 0 51px hsl(327 94% 58%), 0 0 76px hsl(327 94% 58%);',
    'font-family: sans; font-size: 14px;'
  );
}

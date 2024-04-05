export function log(text: string) {
  console.info(
    `[%cS%cx%cP]:%c ${text}`,
    'font-family: sans; font-size: 14px;',
    'font-family: sans; font-size: 14px; color: hsl(327 94% 58%);',
    'font-family: sans; font-size: 14px;',
    'font-family: sans; font-size: 14px;'
  );
}

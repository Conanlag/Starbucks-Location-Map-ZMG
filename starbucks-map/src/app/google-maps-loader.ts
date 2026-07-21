import { environment } from '../environments/environment.development'; // environment only available in development mode

export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.maps?.importLibrary) {
      resolve();
      return;
    }

    ((g: any) => {
      let h: Promise<void>;
      let a: HTMLScriptElement;
      let k: string;
      const p = "The Google Maps JavaScript API";
      const c = "google";
      const l = "importLibrary";
      const q = "__ib__";
      const m = document;
      let b: any = window;

      b = b[c] || (b[c] = {});
      const d = b.maps || (b.maps = {});
      const r = new Set<string>();
      const e = new URLSearchParams();

      const u = () =>
        h ||
        (h = new Promise(async (f, n) => {
          a = m.createElement("script");

          e.set("libraries", [...r] + "");

          for (k in g) {
            e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
          }

          e.set("callback", c + ".maps." + q);

          a.src = `https://maps.googleapis.com/maps/api/js?${e}`;

          (d as any)[q] = f;

          a.onerror = () => n(new Error(p + " could not load."));

          m.head.append(a);
        }));

      if (d[l]) {
        console.warn(p + " only loads once.");
      } else {
        d[l] = (f: string, ...n: any[]) =>
          r.add(f) && u().then(() => d[l](f, ...n));
      }
    })({
      key: environment.googleMapsApiKey,
      v: "weekly",
    });

    (window as any).google.maps.importLibrary("maps")
      .then(() => resolve())
      .catch(reject);
  });
}
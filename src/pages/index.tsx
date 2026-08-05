import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLatestVersion } from '@docusaurus/plugin-content-docs/client';
import styles from './index.module.css';

// These are the first Liquidsoap most visitors ever see, so run them through
// `liquidsoap --check` whenever you edit them.
//
// The radio sample uses the source composition syntax of the upcoming release
// (`source.{weight = n}`), not the `rotate(weights=[...])` form that 2.4.x takes.
const RADIO = `# A complete internet radio, in a handful of lines.
music = playlist("~/music")
jingles = playlist("~/jingles")

# Three tracks, then a jingle, on repeat.
radio = rotate([music.{weight = 3}, jingles.{weight = 1}])

# Smooth transitions between tracks.
radio = crossfade(radio)

# Stream it out to an Icecast server.
output.icecast(%mp3, host="localhost", mount="radio", radio)`;

const VIDEO = `# Take a live video feed from OBS over RTMP.
live = input.rtmp(listen=true, "rtmp://0.0.0.0:1935/live")

# Fall back to a playlist of clips when nobody is streaming.
show = fallback([live, playlist("~/videos")])

# Re-encode with FFmpeg and push it to YouTube Live.
output.youtube.live.rtmp(
  key="your-stream-key",
  encoder=%ffmpeg(%video(codec="libx264"), %audio(codec="aac")),
  show
)`;

const PILLARS = [
  {
    title: 'Simple',
    body: 'Light and easy to use, in the Unix tradition of small strong components working together. Your first stream is a couple of lines of code.',
  },
  {
    title: 'Expressive',
    body: 'Not a configuration file with a fixed set of knobs, but a real language built for streaming, so anything you can describe you can build.',
  },
  {
    title: 'Versatile',
    body: 'Audio and video, dozens of formats and codecs, Icecast, RTMP, SRT and HLS, with FFmpeg wired in throughout. Your stream can come from and go almost anywhere.',
  },
];

const USE_CASES = [
  {
    title: 'Run an internet radio',
    body: 'Point Liquidsoap at a folder of tracks and stream it to an Icecast or Shoutcast server. Scheduling, jingles and fallbacks are a few lines more.',
    to: 'quick_start',
    cta: 'Quickstart',
  },
  {
    title: 'Take live shows',
    body: 'Accept connections from DJ software such as Mixxx, or from a browser, and switch to the live source automatically when someone connects.',
    to: 'harbor',
    cta: 'Harbor input',
  },
  {
    title: 'Stream video',
    body: 'Liquidsoap is not audio only. Ingest RTMP from OBS, mix clips with live feeds, and push the result to YouTube Live, or out over SRT and HLS.',
    to: 'video',
    cta: 'Video streams',
  },
  {
    title: 'FFmpeg, built in',
    body: 'Encoders, decoders and the whole filter graph are reachable from the language, so you can transcode on the fly, or copy streams through untouched when no re-encoding is needed.',
    to: 'ffmpeg',
    cta: 'FFmpeg support',
  },
  {
    title: 'Shape the sound',
    body: 'Write your own transitions, fade tracks in and out, detect blank, normalise loudness, or drop in LADSPA and FFmpeg filters.',
    to: 'crossfade',
    cta: 'Crossfading',
  },
  {
    title: 'Plug in your own backend',
    body: 'Feed tracks from whatever system you already run. Operators like request.dynamic let your database, API or scheduler decide what plays next.',
    to: 'request_sources',
    cta: 'Request sources',
  },
];

// Every entry here is evidenced: an official repository, a documented integration, or a
// Liquidshop talk by the people who run it. Please keep that bar if you add to it.
const USERS = [
  {
    name: 'Radio France',
    what: 'French national public broadcaster, 77 stations',
    href: 'https://github.com/radiofrance/rf-liquidsoap',
    img: 'assets/img/users/radiofrance.png',
  },
  {
    name: 'AzuraCast',
    what: 'Self-hosted web radio management suite',
    href: 'https://www.azuracast.com/',
    img: 'assets/img/users/azuracast.png',
  },
  {
    name: 'LibreTime',
    what: 'Open-source radio automation platform',
    href: 'https://libretime.org/',
    img: 'assets/img/users/libretime.svg',
  },
  {
    name: 'WHIV-LP 102.3 FM',
    what: 'Community radio, New Orleans',
    href: 'https://whivfm.org/listen',
    img: 'assets/img/users/whiv.png',
  },
  {
    name: 'KPISS.FM',
    what: 'Community internet radio, Brooklyn',
    href: 'https://kpiss.fm/',
    img: 'assets/img/users/kpiss.png',
  },
  {
    name: 'Lahmacun Radio',
    what: 'Community radio, Budapest',
    href: 'https://lahmacun.hu/',
    img: 'assets/img/users/lahmacun.png',
  },
  {
    name: 'Radiotomate',
    what: 'Broadcast automation for community radios',
    href: 'https://radiotomate.org/',
    img: 'assets/img/users/radiotomate.svg',
  },
  {
    name: 'Datafruits.fm',
    what: 'Netradio and netlabel',
    href: 'https://datafruits.fm/',
    img: 'assets/img/users/datafruits.png',
  },
];

function Hero({ docs }: { docs: (slug: string) => string }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.pitch}>
          <img src={useBaseUrl('assets/img/logo.svg')} alt="" width={72} height={89} />
          <h1 className={styles.title}>Liquidsoap</h1>
          <p className={styles.tagline}>
            Build audio and video streams from a few lines of code — internet radio, live shows,
            RTMP to YouTube, transcoding and everything in between.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to={docs('quick_start')}>
              Get started
            </Link>
            <Link className="button button--secondary button--lg" to={docs('index.html')}>
              Read the docs
            </Link>
          </div>
        </div>
        <div className={styles.sample}>
          <Tabs>
            <TabItem value="radio" label="Internet radio" default>
              <CodeBlock language="liquidsoap" title="radio.liq">
                {RADIO}
              </CodeBlock>
            </TabItem>
            <TabItem value="video" label="Live video">
              <CodeBlock language="liquidsoap" title="stream.liq">
                {VIDEO}
              </CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  // Links follow the latest released version rather than a hardcoded number.
  const latest = useLatestVersion(undefined);
  const docs = (slug: string) => `${latest.path}/${slug}`;

  return (
    <Layout
      title="Audio & Video Streaming Language"
      description="Liquidsoap is a language for describing audio and video streams. Build internet radios, take live shows, shape transitions and stream anywhere."
    >
      <Hero docs={docs} />

      <main>
        <section className={styles.section}>
          <div className={styles.grid3}>
            {PILLARS.map((p) => (
              <div key={p.title} className={styles.pillar}>
                <h2 className={styles.pillarTitle}>{p.title}</h2>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.tinted}`}>
          <h2 className={styles.sectionTitle}>What you can build</h2>
          <div className={styles.grid3}>
            {USE_CASES.map((c) => (
              <div key={c.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p>{c.body}</p>
                <Link to={docs(c.to)}>{c.cta} →</Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Built on Liquidsoap</h2>
          <p className={styles.lead}>
            From national broadcasters to one-room community stations. Radio France runs its 77
            stations on it; AzuraCast and LibreTime use it as their playout engine.
          </p>
          <ul className={styles.users}>
            {USERS.map((u) => (
              <li key={u.name}>
                <a
                  href={u.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${u.name} — ${u.what}`}
                >
                  <img src={useBaseUrl(u.img)} alt={u.name} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.also}>
            Also{' '}
            <a href="https://live365.com/" target="_blank" rel="noopener noreferrer">
              Live365
            </a>
            ,{' '}
            <a href="https://centova.com/en/cast" target="_blank" rel="noopener noreferrer">
              Centova Cast
            </a>{' '}
            and{' '}
            <a href="https://dtcooper.github.io/crazyarms" target="_blank" rel="noopener noreferrer">
              Crazy Arms
            </a>
            . Many of them have talked about it at the{' '}
            <a href="https://www.liquidsoap.info/liquidshop/" target="_blank" rel="noopener noreferrer">
              Liquidshop workshops
            </a>
            .
          </p>
        </section>

        <section className={`${styles.section} ${styles.tinted}`}>
          <h2 className={styles.sectionTitle}>Get Liquidsoap</h2>
          <div className={styles.grid3}>
            <div className={styles.pillar}>
              <h3 className={styles.cardTitle}>Install it</h3>
              <p>
                The recommended route is the opam package manager. Docker images and native
                packages for Debian, Ubuntu and Alpine are published with every release.
              </p>
              <Link to={docs('install')}>Installation guide →</Link>
            </div>
            <div className={styles.pillar}>
              <h3 className={styles.cardTitle}>Learn it</h3>
              <p>
                Start with the quickstart, work through a complete case analysis, or read the
                Liquidsoap book for the language in depth.
              </p>
              <Link to={docs('book')}>The Liquidsoap book →</Link>
            </div>
            <div className={styles.pillar}>
              <h3 className={styles.cardTitle}>Ask for help</h3>
              <p>
                The Discord channel is the best place for questions and discussion. Bugs and
                feature requests go to GitHub.
              </p>
              <a href="https://chat.liquidsoap.info" target="_blank" rel="noopener noreferrer">
                Join the chat →
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

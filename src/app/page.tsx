"use client"

import { Layout } from '@/components/Layout'
import { useEffect, useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { FormattedDate } from '@/components/FormattedDate'
// import { CodeGroup, Pre, Code } from '@/components/Code'
import { Button } from '@/components/Button'

export default function Home() {
  return (
    <Layout>
      <Article id="connect" date="">
        <Img src="/images/connect_2_computers.png" width={1600} height={900} />
        <h2>Connect A to B. Send Data.</h2>
        <p>In 2023 It&apos;s hard to connect two devices directly. Dumb pipe punches through NATs, using on-the-fly node identifiers, and keeps your machines connected even as network conditions change.</p>
        <p>What you actually <i className='italic'>do</i> with that connection is up to you. </p>
      </Article>
      <Article id="iroh" date="">
        <Img src="/images/node_connections.png" alt="hero" width={1600} height={900} />
        <h2>Dumb pipes are Iroh Connections</h2>
        <p>Ok, &quot;dumb pipe&quot; isn&apos;t really a thing. We made this to tell you about iroh connections. You can use the iroh connection layer as a dumb pipe.</p>
        <Link className='block mt-6' href="https://iroh.computer/docs/connections">
          <Button>Iroh Connection Docs</Button>
        </Link>
      </Article>
      <Article id="" date="">
        <h2>QUIC &amp; Dumb</h2>
        <p>These dumb pipes use QUIC over a magic socket. It may be dumb, but it is still encrypted, and sent over UDP. You can register multiple different handlers with distinct QUIC ALPNs to separate concerns using substreams.</p>
      </Article>
      <Article id="relay" date="">
        <h2>Sometimes you gotta relay</h2>
        <p>For somewhere around 10-20% of connections, it&apos;s simply not possible to connect two devices directly. For those cases, we use a meshed network of relay nodes to pack up UDP traffic & send it over HTTP. Sounds silly, but it works.</p>
        <Link className='block mt-6' href="https://iroh.computer/docs/connections">
          <Button>relay docs</Button>
        </Link>
      </Article>
      <Article id="premium-relays" date="">
        <h2>Coming soon: Premium relays</h2>
        <p><Link href="https://iroh.network">iroh.network</Link> the team behind number zero runs the default relay network, which has a capped bandwidth. High-throughput, authenticated relays are coming to iroh.network in the future.</p>
      </Article>
      <Article id="need-more" date="">
        <h2>Need more?</h2>
        <p>Need pubsub? Data transfer? Sync? All of these are opt-in-able addons from <Link href="https://iroh.computer/docs/layers">iroh</Link>. But if you add these things, the pipe is no longer dumb. You decide how to feel about that.</p>
      </Article>
      {/* <Article id="example" date="">
        <CodeGroup title="example.rs">
          <Pre title="rust" className='language-rust'>{rustExample}</Pre>
        </CodeGroup>
      </Article> */}
    </Layout>
  )
}

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

function Img(props: ImagePropsWithOptionalAlt) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900 [&+*]:mt-8">
      <Image
        alt=""
        sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
        {...props}
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
    </div>
  )
}

function ContentWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div
          className={clsx(
            'mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  )
}

function ArticleHeader({ id, date }: { id: string; date?: string | Date }) {
  return (
    <header className="relative mb-10 xl:mb-0">
      <div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
        <Link href={`#${id}`} className="inline-flex">
          {date && <FormattedDate
            date={date}
            className="hidden xl:pointer-events-auto xl:block xl:text-2xs/4 xl:font-medium xl:text-white/50"
          />}
        </Link>
        <div className="h-2.5 w-2.5 rounded-full bg-gray-700 -ml-0.5 lg:-mr-4 lg:ml-0 xl:-mr-[1px] dark:bg-white" />
      </div>
      <ContentWrapper>
        <div className="flex">
          <Link href={`#${id}`} className="inline-flex">
            {date && <FormattedDate
              date={date}
              className="text-2xs/4 font-medium text-gray-500 dark:text-white/50 xl:hidden"
            />}
          </Link>
        </div>
      </ContentWrapper>
    </header>
  )
}

function Article({
  id,
  date,
  children,
}: {
  id: string
  date: string | Date
  children: React.ReactNode
}) {
  let heightRef = useRef<React.ElementRef<'div'>>(null)
  let [heightAdjustment, setHeightAdjustment] = useState(0)

  useEffect(() => {
    if (!heightRef.current) {
      return
    }

    let observer = new window.ResizeObserver(() => {
      if (!heightRef.current) {
        return
      }
      let { height } = heightRef.current.getBoundingClientRect()
      let nextMultipleOf8 = 8 * Math.ceil(height / 8)
      setHeightAdjustment(nextMultipleOf8 - height)
    })

    observer.observe(heightRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <article
      id={id}
      className="scroll-mt-16"
      style={{ paddingBottom: `${heightAdjustment}px` }}
    >
      <div ref={heightRef}>
        <ArticleHeader id={id} date={date} />
        <ContentWrapper className="typography" data-mdx-content>
          {children}
        </ContentWrapper>
      </div>
    </article>
  )
}


const rustExample = `use std::net::SocketAddr;

use clap::Parser;
use iroh_base::base32;
use iroh_net::{
    defaults::TEST_REGION_ID,
    derp::{DerpMap, DerpMode},
    key::SecretKey,
    magic_endpoint::accept_conn,
    MagicEndpoint, NodeAddr,
};
use tracing::{debug, info};
use url::Url;

const EXAMPLE_ALPN: &[u8] = b"n0/iroh/examples/magic/0";

#[derive(Debug, Parser)]
struct Cli {
    #[clap(short, long)]
    secret: Option<String>,
    #[clap(short, long, default_value = "n0/iroh/examples/magic/0")]
    alpn: String,
    #[clap(short, long, default_value = "0")]
    bind_port: u16,
    #[clap(short, long)]
    derp_url: Option<Url>,
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, Parser)]
enum Command {
    Listen,
    Connect {
        peer_id: String,
        #[clap(long)]
        addrs: Option<Vec<SocketAddr>>,
        #[clap(long)]
        derp_region: Option<u16>,
    },
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = Cli::parse();
    let secret_key = match args.secret {
        None => {
            let secret_key = SecretKey::generate();
            println!("our secret key: {}", base32::fmt(secret_key.to_bytes()));
            secret_key
        }
        Some(key) => parse_secret(&key)?,
    };

    let derp_mode = match args.derp_url {
        None => DerpMode::Default,
        // use region_id 65535, which is reserved for testing and experiments
        Some(url) => DerpMode::Custom(DerpMap::from_url(url, TEST_REGION_ID)),
    };

    let endpoint = MagicEndpoint::builder()
        .secret_key(secret_key)
        .alpns(vec![args.alpn.to_string().into_bytes()])
        .derp_mode(derp_mode)
        .bind(args.bind_port)
        .await?;

    let me = endpoint.node_id();
    let local_addr = endpoint.local_addr()?;
    println!("magic socket listening on {local_addr:?}");
    println!("our node id: {me}");

    match args.command {
        Command::Listen => {
            while let Some(conn) = endpoint.accept().await {
                let (peer_id, alpn, conn) = accept_conn(conn).await?;
                info!(
                    "new connection from {peer_id} with ALPN {alpn} (coming from {})",
                    conn.remote_address()
                );
                tokio::spawn(async move {
                    let (mut send, mut recv) = conn.accept_bi().await?;
                    debug!("accepted bi stream, waiting for data...");
                    let message = recv.read_to_end(1000).await?;
                    let message = String::from_utf8(message)?;
                    println!("received: {message}");

                    let message = format!("hi! you connected to {me}. bye bye");
                    send.write_all(message.as_bytes()).await?;
                    send.finish().await?;

                    Ok::<_, anyhow::Error>(())
                });
            }
        }
        Command::Connect {
            peer_id,
            addrs,
            derp_region,
        } => {
            let addr =
                NodeAddr::from_parts(peer_id.parse()?, derp_region, addrs.unwrap_or_default());
            let conn = endpoint.connect(addr, EXAMPLE_ALPN).await?;
            info!("connected");

            let (mut send, mut recv) = conn.open_bi().await?;

            let message = format!("hello here's {me}");
            send.write_all(message.as_bytes()).await?;
            send.finish().await?;
            let message = recv.read_to_end(100).await?;
            let message = String::from_utf8(message)?;
            println!("received: {message}");
        }
    }
    Ok(())
}

fn parse_secret(secret: &str) -> anyhow::Result<SecretKey> {
    let bytes: [u8; 32] = base32::parse_array(secret)?;
    let key = SecretKey::from(bytes);
    Ok(key)
}`
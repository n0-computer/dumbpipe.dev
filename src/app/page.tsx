"use client"

import { Layout } from '@/components/Layout'
import { useEffect, useRef, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { FormattedDate } from '@/components/FormattedDate'
import Code from '@/components/Code'
import { Button } from '@/components/Button'

export default function Home() {
  return (
      <Layout>
          <Article id="connect" date="">
              <h2>Connect A to B. Send Data.</h2>
              <p>In 2023 it&apos;s hard to connect two devices directly. Dumb pipe punches through NATs, using on-the-fly node identifiers. It even keeps your machines connected as network conditions change.</p>
              <p>What you actually <i className='italic'>do</i> with that connection is up to you. </p>
          </Article>
          <Article id="download" date="">
              <h2>A unix pipe between computers</h2>
              <p>Add dumbpipe to your machine using bash:</p>
              <Code language='bash'>$ curl -sL https://www.dumbpipe.dev/install.sh | sh</Code>
              <p>On windows with PowerShell:</p>
              <Code language='bash'>$ iwr https://www.dumbpipe.dev/install.ps1 -useb | iex</Code>
              <p>Get <span className='font-mono'>dumbpipe</span> with a single command on two computers, connect them & pipe data from one machine to the other. No accounts. No configuration.</p>
              <p>Alternatively, you can install it with <a href="https://doc.rust-lang.org/stable/cargo/">Cargo</a>:</p>
              <Code language='bash'>cargo install dumbpipe</Code>
              <p>Or <a href="https://brew.sh">Homebrew</a>:</p>
              <Code language='bash'>brew install dumbpipe</Code>
              <h2>Receiver</h2>
              <Code language='bash'>{`
$ ./dumbpipe listen
using secret key 23ryys7pgvjrr57pcrvyivdrhvqyykg2tv3leou5grm66xfd7zzq
Listening. To connect, use:
./dumbpipe connect nodeecsxraxjtqtneathgplh6d5nb2rsnxpfulmkec2rvhwv3hh6m4rdgaibamaeqwjaegplgayaycueiom6wmbqcjqaibavg5hiaaaaaaaaaaabaau7wmbq
                  `}
              </Code>
              <h2>Sender</h2>
              <Code language='bash'>{`
echo "hello" | ./dumbpipe connect nodeecsxraxjtqtneathgplh6d5nb2rsnxpfulmkec2rvhwv3hh6m4rdgaibamaeqwjaegplgayaycueiom6wmbqcjqaibavg5hiaaaaaaaaaaabaau7wmbq
                  `}</Code>
              <p>This will work, regardless of where the two machines are. Dumb pipe finds a way.</p>
          </Article>
          <Article id="iroh" date="">
              <h2>Put a dumb pipe in your app</h2>
              <p>Dumb pipes are Iroh Connections. The <span className='font-mono'>dumbpipe</span> tool is a <a href="https://github.com/n0-computer/dumbpipe/blob/main/src/main.rs">200-line wrapper</a> around the <a href="https://crates.io/crates/iroh" className='font-mono'>iroh</a> rust crate. You can use the iroh Endpoint to create a connection to use as a dumb pipe in your own app.</p>
              <Link className='block mt-6' href="https://iroh.computer/docs/concepts/endpoint">
                  <Button>Iroh Endpoint Docs</Button>
              </Link>
          </Article>
          <Article id="" date="">
              <Img src="/images/connect_2_computers.png" width={1600} height={900} />
              <h2>QUIC &amp; Dumb</h2>
              <p>These dumb pipes use QUIC over a magic socket. It may be dumb, but it still has all the features of a full QUIC connection: UDP-based, stream-multiplexing and encrypted. Besides using the multiplexed streams you can also use multiple connections each with their own ALPN.</p>
          </Article>
          <Article id="relay" date="">
              <h2>Sometimes you gotta relay</h2>
              <p>For somewhere around 10-20% of connections, it&apos;s simply not possible to connect two devices directly. For those cases, we use a meshed network of relay nodes to pack up UDP traffic & send it over HTTP. Sounds silly, but it works. And the magic socket handles all this under the hood.</p>
              <Link className='block mt-6' href="https://iroh.computer/docs/concepts/relay">
                  <Button>relay docs</Button>
              </Link>
          </Article>
          <Article id="premium-relays" date="">
              <h2>Your own Network</h2>
              <p>The team behind number0 runs the default relay network, which has a capped bandwidth. High-throughput, authenticated relays are now available through <Link href="https://n0des.iroh.computer">n0des</Link>!</p>
          </Article>
          <Article id="need-more" date="">
              <h2>Need more?</h2>
              <p>Need pubsub? Data transfer? Sync? All of these are opt-in addons from <Link href="https://iroh.computer/proto">iroh</Link>. But if you add these things, the pipe is no longer dumb. You decide how to feel about that.</p>
          </Article>
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
    <div className="mx-auto max-w-7xl px-6 lg:flex">
      <div className="lg:ml-80 lg:flex lg:w-full lg:justify-end">
        <div
          className={clsx(
            'mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-[36.5rem] lg:flex-auto',
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

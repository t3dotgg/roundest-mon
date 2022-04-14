const AboutPage = () => {
  return (
    <div className="flex flex-col items-center text-xl">
      <h2 className="text-2xl p-4">About</h2>
      <p className="max-w-xl">
        I made this because I'm weird and dumb idk what you expect me to say
      </p>
      <div className="p-4" />
      <ul>
        <li>
          {"- "}
          <a
            className="text-blue-200 underline"
            href="https://twitter.com/t3dotgg"
          >
            Follow me on Twitter
          </a>
        </li>
        <li>
          {"- "}
          <a
            className="text-blue-200 underline"
            href="https://plausible.io/roundest.t3.gg"
          >
            Public analytics on Plausible
          </a>
        </li>
        <li>
          {"- "}
          <a
            className="text-blue-200 underline"
            href="https://github.com/TheoBr/roundest-mon"
          >
            Public Github repo
          </a>
        </li>
        <li>
          {"- "}
          <a
            className="text-blue-200 underline"
            href="https://www.youtube.com/watch?v=PKy2lYEnhgs"
          >
            Twitch stream where I built this monstrosity
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;

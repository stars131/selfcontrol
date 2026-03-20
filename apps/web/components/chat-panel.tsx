"use client";

import { useState } from "react";

const initialMessages = [
  {
    role: "assistant",
    content:
      "可以直接告诉我要记录什么，或者查询你吃过的店、零食、避雷项。我会先生成结构化草稿，再等你确认写入。",
  },
  {
    role: "user",
    content: "昨天在万象城吃的烤鱼很好吃，帮我记一下。",
  },
];

export function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: value },
      {
        role: "assistant",
        content:
          "已识别为新增记录请求。右侧会展示标题、类型、时间、地点、评分等结构化草稿，确认后再写入数据库。",
      },
    ]);
    setDraft("");
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agent</div>
          <h2 className="title" style={{ fontSize: 22 }}>
            聊天助手
          </h2>
        </div>
        <button className="button secondary" type="button">
          新建会话
        </button>
      </div>
      <div className="panel-body">
        <div className="message-list">
          {messages.map((message, index) => (
            <article
              className={`message ${message.role === "assistant" ? "assistant" : ""}`}
              key={`${message.role}-${index}`}
            >
              <div className="eyebrow">{message.role === "assistant" ? "助手" : "你"}</div>
              <div style={{ marginTop: 8, lineHeight: 1.6 }}>{message.content}</div>
            </article>
          ))}
        </div>

        <div className="composer">
          <textarea
            className="textarea"
            placeholder="例如：帮我查一下去年在杭州吃过哪些推荐的日料。"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button className="button" type="button" onClick={handleSend}>
            发送
          </button>
        </div>
      </div>
    </section>
  );
}


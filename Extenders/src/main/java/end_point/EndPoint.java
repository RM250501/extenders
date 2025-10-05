package end_point;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/Extenders/chat")

public class EndPoint {

	private static Set<Session> clients = new CopyOnWriteArraySet<>();
	private static Map<String, String> userNames = new HashMap<>();
	private static List<String> words = new ArrayList<>();
	private static int cnt = 0;

	@OnOpen
	public void onOpen(Session session) throws IOException {
		clients.add(session);
		System.out.println("New connection:" + session.getId());
		if (clients.size() == 2) {
			for (Session client : clients) {
				client.getBasicRemote().sendText("tm" + "恐竜");
			}
		}
	}

	@OnMessage
	public void onMessage(String message, Session sender) throws IOException {

		System.out.println(message);
		System.out.println("User" + sender.getId() + " : " + clients.size());

		switch (message.substring(0, 2)) {
		case "pr":
			words.add(message.substring(2));
			cnt++;
		}

		System.out.println("cnt : " + cnt);

		if (cnt == clients.size()) {

			System.out.println("全員の回答が出そろいました");

			int ch = 0;
			String ch_str = words.get(0);

			for (String st : words) {
				if (st.equals(ch_str)) {
					ch++;
				}
			}

			if (ch == clients.size()) {
				System.out.println("全員一致しました、おめでとう！");
				for (Session client : clients) {
					client.getBasicRemote().sendText("gc");
				}
			} else {
				System.out.println("残念、みんなの息が合いませんでした。");
				for (Session client : clients) {
					client.getBasicRemote().sendText("go");
				}
			}
		}

		//		String name = "";
		//
		//		// messageの先頭2文字はチェックディジット
		//		// このswitch文でチェックディジットを判定
		//		switch (message.substring(0, 2)) {
		//		case "un": // ユーザ名の登録
		//			userNames.put(sender.getId(), message.substring(2));
		//			break;
		//		case "me": // メッセージの送信
		//			for (Map.Entry<String, String> entry : userNames.entrySet()) {
		//				if (entry.getKey().equals(sender.getId())) {
		//					name = entry.getValue();
		//					break;
		//				}
		//			}
		//			for (Session client : clients) {
		//				client.getBasicRemote().sendText(name + " : " + message.substring(2));
		//			}
		//			break;
		//		}

	}

	@OnClose
	public void onClose(Session session) {
		cnt = 0;
		words.clear();
		clients.remove(session);
		userNames.remove(session.getId());
		System.out.println("Closed: " + session.getId());
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		System.err.println("Error: " + throwable.getMessage());
	}

}

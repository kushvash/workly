// client/components/VideoCall.js
import { useEffect, useState, useRef } from "react";
import socket from "../socket";

export default function VideoCall() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const [pendingCandidates, setPendingCandidates] = useState([]);

  useEffect(() => {
    socket.on("receive_offer", (offer) => { /* existing offer handling */ });
    socket.on("receive_answer", (answer) => { /* existing answer handling */ });
    socket.on("receive_ice_candidate", (candidate) => { /* existing ICE handling */ });
  
    // ✅ Cleanup function
    return () => {
      socket.off("receive_offer");
      socket.off("receive_answer");
      socket.off("receive_ice_candidate");
    };
  }, []);
  
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" }, // Free STUN server
    ],
  };

  const joinRoom = async () => {
    if (!room.trim()) return alert("Enter a room ID");
    socket.emit("join_room", room);
    setJoined(true);
    await startLocalStream();  // Must be called before starting a call
  };

  const endCall = () => {
    if (peerConnection.current) {
      // Close the peer connection
      peerConnection.current.close();
      peerConnection.current = null;
    }
  
    // Stop local media tracks
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
  
    // Stop remote video stream
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
  
    // Reset joined state to allow rejoining
    setJoined(false);
    setRoom("");
    alert("Call ended.");
  };


  const startLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    peerConnection.current = new RTCPeerConnection(iceServers);

    // Add local stream tracks
    stream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, stream);
    });

    // Handle remote stream
    peerConnection.current.ontrack = ({ streams }) => {
      remoteVideoRef.current.srcObject = streams[0];
    };

    // Handle ICE candidates
    peerConnection.current.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit("ice_candidate", { room, candidate });
      }
    };

    // Listen for signaling data
    // socket.on("receive_offer", async (offer) => {
    //   await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    //   const answer = await peerConnection.current.createAnswer();
    //   await peerConnection.current.setLocalDescription(answer);
    //   socket.emit("answer", { room, answer });
    // });

    // socket.on("receive_answer", async (answer) => {
    //   await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    // });
    socket.on("receive_offer", async (offer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", { room, answer });
      
        // Add any queued candidates
        pendingCandidates.forEach((candidate) => {
          peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) => {
            console.error("Error adding queued ICE candidate:", err);
          });
        });
        setPendingCandidates([]);
      });
      
      socket.on("receive_answer", async (answer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      
        // Add queued candidates
        pendingCandidates.forEach((candidate) => {
          peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) => {
            console.error("Error adding queued ICE candidate:", err);
          });
        });
        setPendingCandidates([]);
      });

    socket.on("receive_ice_candidate", (candidate) => {
        if (peerConnection.current) {
          if (peerConnection.current.remoteDescription && peerConnection.current.remoteDescription.type) {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) => {
              console.error("Error adding ICE candidate:", err);
            });
          } else {
            setPendingCandidates((prev) => [...prev, candidate]); // Queue candidate
          }
        }
      });
    // socket.on("receive_ice_candidate", (candidate) => {
    //     if (candidate && candidate.candidate) {
    //       peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) => {
    //         console.error("Error adding ICE candidate:", err);
    //       });
    //     } else {
    //       console.warn("Received invalid ICE candidate:", candidate);
    //     }
    //   });
  };


  const startCall = async () => {
    if (!peerConnection.current) {
      alert("Please join a room first.");
      return;
    }
  
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.emit("offer", { room, offer });
    } catch (err) {
      console.error("Error creating offer:", err);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow space-y-4">
  <h2 className="text-2xl font-semibold text-gray-800">Video Call</h2>
  {!joined ? (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder="Enter room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="w-full md:w-1/2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={joinRoom}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Join Room
      </button>
    </div>
  ) : (
    <div className="flex space-x-4">
      <button
        onClick={startCall}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Start Call
      </button>
      <button
        onClick={endCall}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        End Call
      </button>
    </div>
  )}

  <div className="flex flex-col md:flex-row justify-around mt-6 space-y-6 md:space-y-0">
    <div className="flex flex-col items-center">
      <h4 className="font-medium text-lg mb-2">Your Video</h4>
      <video
        ref={localVideoRef}
        autoPlay
        muted
        className="w-72 h-48 rounded border-2 border-gray-300"
      />
    </div>
    <div className="flex flex-col items-center">
      <h4 className="font-medium text-lg mb-2">Remote Video</h4>
      <video
        ref={remoteVideoRef}
        autoPlay
        className="w-72 h-48 rounded border-2 border-gray-300"
      />
    </div>
  </div>
</div>
    // <div style={{ marginTop: "20px" }}>
    //   <h2>Video Call</h2>
    //   {
    //     !joined ? (
    //         <>
    //           <input
    //             type="text"
    //             placeholder="Enter room ID"
    //             value={room}
    //             onChange={(e) => setRoom(e.target.value)}
    //           />
    //           <button onClick={joinRoom}>Join Room</button>
    //         </>
    //       ) : (
    //         <>
    //           <button onClick={startCall}>Start Call</button>
    //           <button 
    //             onClick={endCall} 
    //             style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
    //           >
    //             End Call
    //           </button>
    //         </>
    //       )
    //   }

    //   <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
    //     <div>
    //       <h4>Your Video</h4>
    //       <video ref={localVideoRef} autoPlay muted style={{ width: "300px", border: "1px solid black" }} />
    //     </div>
    //     <div>
    //       <h4>Remote Video</h4>
    //       <video ref={remoteVideoRef} autoPlay style={{ width: "300px", border: "1px solid black" }} />
    //     </div>
    //   </div>
    // </div>
  );
}
const ConversationPage = ({
  params,
}: {
  params: { conversationId: string }
}) => {
  return <p>{params.conversationId}</p>
}

export default ConversationPage

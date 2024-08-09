function MemberInfo ({label, value}) {
    return(
        <>
        
        <div className="mx-auto my-auto py-6 px-8 border-b-[3px] bg-white p-1 flex">
        <table className="w-full overflow-hidden ">
          <tbody>
            <tr>
              <td className="w-[200px] font-bold">{label}</td>
              <td className="flex-1">{value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </>
      
      
      
    )
}
export default MemberInfo;